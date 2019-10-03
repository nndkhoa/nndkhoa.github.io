var DATA_PATH = 'data.json?v=0.3';
var DEFAULT_SEARCH_TERM = 'Mã NV (7 ký tự)';

var getLangConfig = function () {
  return {
    emptyTable: 'Không có dữ liệu.',
    zeroRecords: 'Không có dữ liệu.',
    lengthMenu: 'Số lượng nhân viên: _MENU_',
    loadingRecords: 'Đang tải...',
    processing: 'Đang xử lý...',
    search: 'Tìm kiếm:',
    paginate: {
      next: 'Sau',
      previous: 'Trước'
    },
    info: '<b>_TOTAL_</b> nhân viên.',
    infoFiltered: 'Trên tổng số <b>_MAX_</b> nhân viên.',
    infoEmpty: '',
  }
}

var setupColHeaders = function (data_cols, table_element) {
  var thead = $('<thead>').addClass('bg-success text-light');
  var tr = $('<tr>');
  thead.append(tr);

  for (var i = 0, n = data_cols.length; i < n; i++) {
    var col = data_cols[i];
    var td = $('<td>').append(col.data);
    if (i === n - 1)
      td.addClass('font-weight-bold');

    tr.append(td);
  }

  table_element.append(thead);
}

var setupTable = function (table_element, columns, data) {
  setupColHeaders(columns, table_element);

  var language = getLangConfig();
  var table = table_element.DataTable({
    order: [
      [0, 'asc']
    ],
    search: {
      search: DEFAULT_SEARCH_TERM
    },
    paging: false,
    data,
    columns,
    language,
    createdRow: function (row, data, index) {
      var lastColIdx = columns.length - 1;
      var lastCol = columns[lastColIdx].data;
      if (data[lastCol] < 4.5) {
        $('td', row).eq(lastColIdx).addClass('cell-highlight');
      }
    },
    fixedHeader: true,
  });

  $('.dataTables_filter input').unbind()
    .focus(function () {
      $(this).val('');
    })
    .keyup(function () {
      var value = $(this).val().trim();

      if (value === '^$') {
        table.search('').draw(); // searchAll
        return;
      }

      if (value.length >= 7) {
        table.search(value).draw();
      } else {
        table.search(DEFAULT_SEARCH_TERM).draw();
      }
    });
}

$(function () {
  $.getJSON(DATA_PATH, function (data) {
    $('#subj').html(data.subj);
    $('#class').html(data.class);
    $('#lecturer').html(data.lecturer);
    $('#lastUpdate').html($('<b>').append(data.lastUpdate));

    setupTable($('#myTable'), data.cols, data.data);
  });
});