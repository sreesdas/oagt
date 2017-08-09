import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';

@Injectable()
export class DbProvider {

  private db : SQLiteObject;

  constructor(private sqlite : SQLite, private http : Http, platform : Platform) {
      console.log("Inside constructor of DbProvider");
  }

  public createDatabase() {
    return new Promise(( resolve , reject ) => {
        this.sqlite.create({
          name: 'data.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
            this.db = db;
            this.createTable();
            resolve("OK");
        })
        .catch(e => { console.log('ERROR loading Database');
                      reject(e);
                    });
    });
  }

  public createTable() {
    this.db.executeSql('CREATE TABLE IF NOT EXISTS `tbl_employee` ( `CPF` TEXT UNIQUE, `NAME` TEXT, `DESIGNATION` TEXT, `DISCIPLINE` TEXT, `MOBILE` TEXT, `EPABX_OFFICE` TEXT, `EPABX_HOME` TEXT, `BSNL_OFFICE` TEXT, `BSNL_HOME` TEXT, `QUARTER` TEXT,`SEARCH_TAG` TEXT,`STARRED` INTEGER DEFAULT 0, PRIMARY KEY(`CPF`) )', {})
      .then(() => {
          console.log('Executed SQL');
      })
      .catch(e => console.log('ERROR Creating tbl_employee'));
  }

  public updateCheck(cpf) {
      return new Promise(( resolve , reject ) => {
        let url = 'http://sreenathsdas.16mb.com/oagtv2/get.php?cpf=' + cpf;
        this.http.get(url).map(res => res.json()).subscribe(result => {
          if(result.updates == "true"){
            let i=0;
            for( let each of result.data.add ){
              this.db.executeSql("INSERT OR REPLACE INTO tbl_employee (CPF, NAME, DESIGNATION, DISCIPLINE, MOBILE, EPABX_OFFICE, EPABX_HOME, BSNL_OFFICE, BSNL_HOME,SEARCH_TAG,QUARTER) VALUES (?,?,?,?,?,?,?,?,?,?,?);" , [each.cpf,each.name,each.desig,each.disc,each.mobile,each.epabx_office,each.epabx_home,each.bsnl_office,each.bsnl_home,each.search_tag,each.quarter])
              .then(() => {
                i+=1;
                console.log( Math.floor((i*100)/result.data.add.length) + ' % DONE ');
                if(i == result.data.add.length){
                  console.log("Done updating received data");
                  resolve("success");
                }
              })
              .catch(e => reject(e));
            }
          }
          else{
            console.log(">> No updates found!");
            resolve("noUpdate");
          }
        });
      });
  }

  public setStar(star, cpf){
      this.db.executeSql('UPDATE tbl_employee SET STARRED=? WHERE CPF=?', [star,cpf])
      .then((data) => {
        console.log("Succesfully starred!");
      })
      .catch(e => console.log(e));
  }

  public readValues() {
    return new Promise(( resolve , reject ) => {
      this.db.executeSql('SELECT * FROM tbl_employee ORDER BY STARRED DESC, NAME ASC', {})
      .then((data) => {
        let result = [];
        if(data.rows.length > 0) {
            for(var i = 0; i < data.rows.length; i++) {
                result.push({ cpf: data.rows.item(i).CPF,
                              mobile : data.rows.item(i).MOBILE,
                              starred : data.rows.item(i).STARRED,
                              search_tag : data.rows.item(i).SEARCH_TAG,
                              name: data.rows.item(i).NAME });
            }
        }
        resolve(result);
      })
      .catch(e => {reject(e); console.log('ERROR Read from tbl_employee');});
    });
  }

  public readDetails(cpf){
    console.log("Inside ReadDetails" + cpf);
    return new Promise(( resolve , reject ) => {
      let sql ="SELECT * FROM tbl_employee WHERE CPF='" + cpf +"'";
      console.log(sql);
      this.db.executeSql(sql, {})
      .then((data) => {
        let result = [];
        if(data.rows.length > 0) {
            for(var i = 0; i < data.rows.length; i++) {
                result.push({ cpf: data.rows.item(i).CPF,
                              name: data.rows.item(i).NAME,
                              designation: data.rows.item(i).DESIGNATION,
                              discipline: data.rows.item(i).DISCIPLINE,
                              mobile: data.rows.item(i).MOBILE,
                              epabx_office: data.rows.item(i).EPABX_OFFICE,
                              epabx_home: data.rows.item(i).EPABX_HOME,
                              bsnl_office: data.rows.item(i).BSNL_OFFICE,
                              bsnl_home: data.rows.item(i).BSNL_HOME,
                              starred  : data.rows.item(i).STARRED,
                           });
            }
        }
        resolve(result);
      })
      .catch(e => { console.log('ERROR Read from tbl_employee'); reject(e); });
    });
  }
}
