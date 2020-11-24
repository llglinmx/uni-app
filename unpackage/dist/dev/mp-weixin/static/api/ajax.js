import databseUrl from "../js/global.js"

const url = databseUrl.databseUrl

function openSqlite() {
    //创建数据库或者打开
    //这plus.sqlite只在手机上运行
    return new Promise((resolve, reject) => {
        plus.sqlite.openDatabase({
            name: url,//数据库名称
            path: '_doc/' + url + '.db', //数据库地址，uniapp推荐以下划线为开头
            success(e) {
                resolve(e); //成功回调
            },
            fail(e) {
                reject(e); //失败回调
            }
        })
    })

}

//关闭数据库
function closeSQL(name) {
    return new Promise((resolve, reject) => {
        plus.sqlite.closeDatabase({
            name: url,
            success(e) {
                resolve(e);
            },
            fail(e) {
                reject(e);
            }
        })
    })
}


// 查询SQL语句
function selectSQL() {
    return new Promise((resolve, reject) => {
        plus.sqlite.selectSql({
            name: url,
            sql: 'select * from database',
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
    selectSQL
    // userInfoSQL，
    // addUserInformation，
    // selectInformationType，
    // deleteInformationType，
    // pullSQL，
    // isOpen，
    // modifyInformation
}
