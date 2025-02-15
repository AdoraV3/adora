interface ExportToCSVParams<T> {
  columns: string[];
  data: T[][];
  name?: string;
}

export const exportToCSV = <T>({
  columns,
  data,
  name = "data",
}: ExportToCSVParams<T>) => {
  const sheet = [columns, ...data].map(row => row.join(","));
  const csvContent = `data:text/csv;charset=utf-8,${sheet.join("\n")}`;
  const encodedURI = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedURI);
  link.style.display = "none";
  link.setAttribute("download", `${name}.csv`);
  document.body.appendChild(link);

  link.click();
  document.body.removeChild(link);
};
