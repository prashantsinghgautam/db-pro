const Table = require('../models/table');

exports.createTable = async (req, res) => {
  const { tableName, columns } = req.body;

  try {
    await Table.createTable(tableName, columns);
    const allTables = await Table.getAllTables();
    res.json(allTables[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addRecord = async (req, res) => {
  try {
    const { tableName, record } = req.body;
    await Table.addRecord(tableName, record);
    const tableData = await Table.getTableData(tableName);
    const columns = tableData[1].map((column) => column.name);
    res.json({ tableName, tableData: tableData[0], columns });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTables = async (req, res) => {
  try {
    const tables = await Table.getAllTables();
    res.json(tables[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTableData = async (req, res) => {
  try {
    const { tableName } = req.params;
    const tableData = await Table.getTableData(tableName);
    const columns = tableData[1].map((column) => column.name);
    res.json({ tableName, tableData: tableData[0], columns });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const { tableName, id } = req.body;
    await Table.deleteRecord(tableName, id);
    const tableData = await Table.getTableData(tableName);
    const columns = tableData[1].map((column) => column.name);
    res.json({ tableName, tableData: tableData[0], columns });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.dropTable = async (req, res) => {
  const { tableName } = req.params;

  try {
    await Table.dropTable(tableName);
    const allTables = await Table.getAllTables();
    res.json(allTables[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
