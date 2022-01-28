function csv() {

  const tableRows = document.querySelectorAll('tr')
  const exportBtn = document.querySelector('[id="btnExport"]')

  exportBtn.addEventListener('click', () => {
    const CSVString = Array.from(tableRows)
      .map(row => Array.from(row.cells)
        .map(cell => cell.textContent)
        .join(',')
      )
      .join('\n')
    exportBtn.setAttribute(
      'href',
      `data:text/csvcharset=utf-8,${encodeURIComponent(CSVString)}`
    )
    exportBtn.setAttribute('download', 'pontos.csv')
  })

};



