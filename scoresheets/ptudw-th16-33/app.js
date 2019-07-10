var DATA_PATH = 'data.json?v=0.4';
var DEFAULT_SEARCH_TERM = 'MSSV';

// var getColumnsConfig = function () {
//   return [
//     { data: 'MSSV' },
//     { data: 'Họ Tên', 'orderable': false },
//     { data: '+', 'orderable': false },
//     { data: 'IA01', 'orderable': false },
//     { data: 'IA02', 'orderable': false },
//     { data: 'IA03', 'orderable': false },
//     { data: 'GK', 'orderable': false },
//     { data: 'CK', 'orderable': false },
//     {
//       data: FINAL_COL,
//       // render: function (data, type, row) {
//       //   return '<span class="font-weight-bold">' + data + '</span>';
//       // }
//     }
//   ];
// }

var getLangConfig = function () {
  return {
    emptyTable: 'Không có dữ liệu.',
    zeroRecords: 'Không có dữ liệu.',
    lengthMenu: 'Số lượng sinh viên: _MENU_',
    loadingRecords: 'Đang tải...',
    processing: 'Đang xử lý...',
    search: 'Tìm kiếm:',
    paginate: {
      // first: 'Đầu',
      // last: 'Cuối',
      next: 'Sau',
      previous: 'Trước'
    },
    // info: 'Sinh viên _START_-_END_ trên tổng số _TOTAL_ sinh viên.',
    info: '<b>_TOTAL_</b> sinh viên.',
    infoFiltered: 'Trên tổng số <b>_MAX_</b> sinh viên.',
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
    // info: false,
    // scrollY: '400px',
    // scrollCollapse: true,
    // deferLoading: true,
    // ordering: false,
    order: [
      [0, 'asc']
    ],
    search: {
      search: DEFAULT_SEARCH_TERM
    },
    paging: false,
    // pageLength: 50,
    // lengthMenu: [
    //   [20, 50, 100, -1], [20, 50, 100, 'Tất cả']
    // ],
    // ajax: DATA_PATH,
    // deferRender: true,
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
    // responsive: true,
    // responsive: {
    //   details: {
    //     display: $.fn.dataTable.Responsive.display.modal({
    //       header: function (row) {
    //         var data = row.data();
    //         return 'Details for ' + data[0] + ' ' + data[1];
    //       }
    //     }),
    //     renderer: $.fn.dataTable.Responsive.renderer.tableAll({
    //       tableClass: 'table'
    //     })
    //   }
    // }
  });

  // $('#myTable').on('search.dt', function () {
  //   var value = $('.dataTables_filter input').val();
  //   console.log(value);
  // });

  $('.dataTables_filter input').unbind().keyup(function () {
    var value = $(this).val().trim();

    if (value === '^$') {
      table.search('').draw(); // searchAll
      return;
    }

    if (value.length === 7) {
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