const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
    server: 'LAPTOP-2HQQGK0E\\NNNN', // Sửa ký tự escape cho tên máy chủ
    database: 'Asm_FrontEnd',
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
    authentication: {
        type: 'ntlm',
        options: {
            domain: ''
        }
    }
};
sql.connect(dbConfig, err => {
    if (err) {
        console.log('Lỗi kết nối SQL Server:', err);
    } else {
        console.log('Kết nối SQL Server thành công');
    }
});

app.post('/login', async (req, res) => {
    const { taikhoan, matkhau } = req.body;
    try {
        const result = await sql.query`SELECT * FROM DangNhap WHERE taikhoan = ${taikhoan} AND matkhau = ${matkhau}`;
        if (result.recordset.length > 0) {
            res.status(200).json({ message: 'Đăng nhập thành công', user: result.recordset[0] });
        } else {
            res.status(401).json({ message: 'Thông tin đăng nhập không đúng' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi đăng nhập', error: err });
    }
});

app.post('/register', async (req, res) => {
    const { taikhoan, matkhau } = req.body;
    try {
        await sql.query`INSERT INTO DangNhap (taikhoan, matkhau) VALUES (${taikhoan}, ${matkhau})`;
        res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi đăng ký', error: err });
    }
});

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
