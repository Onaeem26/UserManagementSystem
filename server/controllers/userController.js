const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit     : 100,
    host                : 'localhost', 
    user                : 'root',
    database            : '',
    password            : ''        
});

//View all users
exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected 
        console.log(`Connected as ID ` + connection.threadId)

        connection.query('SELECT * from user', (err, rows) => {
            // when done with connection, release it
            connection.release()

            if (!err) {
                res.render('home', {rows})
            }else {
                console.log(err)
            }
            console.log('The data from db is: \n', rows)
       }) 
    })
}

//Search user by First Name and Last Name 
exports.find = (req, res) => { 
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected 
        console.log(`Connected as ID ` + connection.threadId)

        let searchTerm = req.body.search
        console.log(searchTerm)

        connection.query('SELECT * from user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            // when done with connection, release it
            connection.release()

            if (!err) {
                res.render('home', {rows})
            }else {
                console.log(err)
            }
            console.log('The search from db is: \n', rows)
       }) 
    })
}

//Render new user form
exports.form = (req, res) => { 
    res.render(`add-user`)
}

// Add new user to the database
exports.create = (req, res) => { 
    const {first_name, last_name, email, phone, comments} = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected 
        console.log(`Connected as ID ` + connection.threadId)

        let searchTerm = req.body.search
        console.log(searchTerm)

        connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
            // when done with connection, release it
            connection.release()

            if (!err) {
                res.render('add-user', {alert: "User added successfully!"})
            }else {
                console.log(err)
            }
            console.log('The ting from db is: \n', rows)
       }) 
    })
}

//show edit user info in the form 
exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected 
        console.log(`Connected as ID ` + connection.threadId)

        connection.query('SELECT * from user WHERE id = ?', [req.params.id], (err, rows) => {
            // when done with connection, release it
            connection.release()

            if (!err) {
                res.render('edit-user', {rows})
            }else {
                console.log(err)
            }
            console.log('The data from db is: \n', rows)
       }) 
    })
}

//Update user 
exports.update = (req, res) => {
    const {first_name, last_name, email, phone, comments} = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected 
        console.log(`Connected as ID ` + connection.threadId)

        connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {
            // when done with connection, release it
            connection.release()

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; // not connected 
                    console.log(`Connected as ID ` + connection.threadId)
            
                    connection.query('SELECT * from user WHERE id = ?', [req.params.id], (err, rows) => {
                        // when done with connection, release it
                        connection.release()
            
                        if (!err) {
                            res.render('edit-user', {rows, alert: `${first_name} has been updated`})
                        }else {
                            console.log(err)
                        }
                        console.log('The data from db is: \n', rows)
                   }) 
                })
            }else {
                console.log(err)
            }
            console.log('The data from db is: \n', rows)
       }) 
    })
}

//delete a user 
exports.delete = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected 
        console.log(`Connected as ID ` + connection.threadId)

        connection.query('DELETE from user WHERE id = ?', [req.params.id], (err, rows) => {
            // when done with connection, release it
            connection.release()

            if (!err) {
                res.redirect('/')
            }else {
                console.log(err)
            }
            console.log('The data from db is: \n', rows)
       }) 
    })
}

//view users detail
exports.userDetail = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected 
        console.log(`Connected as ID ` + connection.threadId)

        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            // when done with connection, release it
            connection.release()

            if (!err) {
                res.render('view-user', {rows})
            }else {
                console.log(err)
            }
            console.log('The data from db is: \n', rows)
       }) 
    })
}