import databseUrl from "../js/global.js"

// const url = databseUrl.databseUrl

function openSqlite(name, path) {
    //创建数据库或者打开
    //这plus.sqlite只在手机上运行
    return new Promise((resolve, reject) => {
        plus.sqlite.openDatabase({
            // name: "main", //数据库名称
            // path: '_www/static/sql/sqlite.db', //数据库地址，uniapp推荐以下划线为开头

            name: name, //数据库名称
            path: path, //数据库地址，uniapp推荐以下划线为开头

            // name: url, //数据库名称
            // path: '_doc/' + url + '.db', //数
            success(e) {
                resolve(e); //成功回调
            },

            fail(e) {
                reject(e); //失败回调
            }
        })
    })
}

// 创建表
function createTable(name, sql) {
    return new Promise((resolve, reject) => {
        plus.sqlite.executeSql({
            name: name,
            sql: sql,
            success(e) {
                resolve(e);
            },
            fail(e) {
                reject(e);
            }
        });
    })
}

// 插入数据
function insertData(name, sql) {
    return new Promise((resolve, reject) => {
        plus.sqlite.executeSql({
            // name: "words",
            // sql: 'insert into words values(1,"abandon","əbændən","v. 遗弃；离开；放弃；终止；陷入. 放任，狂")',
            name: name,
            sql: sql,
            success(e) {
                resolve(e);
            },
            fail(e) {
                reject(e);
            }
        });
    })
}

// 删除数据
function deleteTable(name, table) {
    return new Promise((resolve, reject) => {
		console.log("'TRUNCATE TABLE " +table +"'")
        plus.sqlite.executeSql({
            name: name,
            sql: "'TRUNCATE TABLE " +table +"'",
            success(e) {
                resolve(e);
            },
            fail(e) {
                reject(e);
            }
        });
    })
}

//关闭数据库
function closeSQL(name) {
    return new Promise((resolve, reject) => {
        plus.sqlite.closeDatabase({
            name: name,
            success(e) {
                resolve(e);
            },
            fail(e) {
                reject(e);
            }
        })
    })
}


//监听数据库是否开启
function isOpen(name, url) {
    //数据库打开了就返回true,否则返回false
    var open = plus.sqlite.isOpenDatabase({
        name: name,
        path: '_doc/' + url + '.db'
    })
    console.log(open)
    return open;
}

// 查询SQL语句
function selectSQL(name, sql) {
    return new Promise((resolve, reject) => {
        plus.sqlite.selectSql({
            name: name,
            // name: "main", //数据库名称
            sql: sql,
            success(e) {
                resolve(e);
            },
            fail(e) {
                reject(e);
            }
        })
    })
}

//把这些方法导出去
export {
    openSqlite,
    closeSQL,
    selectSQL,
    isOpen,
    createTable,
    insertData,
    deleteTable
    // userInfoSQL，
    // addUserInformation，
    // selectInformationType，
    // deleteInformationType，
    // pullSQL，
    // isOpen，
    // modifyInformation
}
