// Module dependencies
const   mongoose = require('mongoose'),
        Employee = require('../models/employee'),
        Partner = require('../models/partner'),
        dbConfig = require('./configLoader').databaseConfig,
        connectionString = `mongodb://${dbConfig.host}/${dbConfig.database}`,
        connection = null;

class DBSeeder {

    init() {
        mongoose.connection.db.listCollections({name: 'employees'})
                .next((err, collinfo) => {
                    if (!collinfo) {
                        console.log('Starting dbSeeder...');
                        this.seed();
                    }
                });
    }

    seed() {

        console.log('Seeding data....');

        //Employees
        var employeeNames =
        [
            "Anastasia10",
            "Anastasia2",
            "Anastasia3",
            "Anastasia4",
            "Vania",
            "Petja",
            "Kaliina",
            "Malina"
        ];
        var positions =
        [
            "boss",
            "developer",
            "projectmanager",
            "tester",
            "QA",
            "admin",
            "team leader",
            "all things doing"
        ];

        var partners =
        [
         "Dobrin,DL@abv.bg,787779",
          "Geno, G@abv.bg, 998888",
          "Svetla, S@abv.bg,55878843",
          "Viden, V@abv.bg, 99828" ,
          "Vasilka, AL@abv.bg, 9448888",
          "Monika, MT@abv.bg, 4444",
          "Katia, AK@abv.bg, 5522",
          "Nadia,N@abv.bg, 22532"

        ];

        var partnersIds = [5, 9, 44, 4, 5, 22, 8, 6];

      //if (Employee != undefined)
        Employee.remove({});

       var l = employeeNames.length;
        /*   ,i,
            j,
            firstOrder,
            lastOrder,
            tempOrder,
            n = orders.length;*/

        for (i = 0; i < l; i++) {
            var partnerD = partners[i].split(',');
            var partner = { 'id': partnersIds[i], 'name': partnerD[0], 'email': partnerD[1], 'phone': partnerD[2] };
            var employee = new Employee({
                'name': employeeNames[i],
                'position': positions[i],
                'partner': partner,
                'partnerId': partnersIds[i]//,
            // 'partners': partner
            });

            employee.save((err, empl) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('inserted employee: ' + empl.name + ' ' + empl.position);
                }
            });
        }

        //Partners
        var partnersM = [
        { "name": "Dobrin", "email": "DL@abv.bg", "phone": "787779" },
        { "name": "Geno", "email": "G@abv.bg", "phone": "998888" },
        { "name": "Svetla", "email": "S@abv.bg", "phone": "55878843" },
        { "name": "Viden", "email": "V@abv.bg", "phone": "99828" },
        { "name": "Vasilka", "email": "AL@abv.bg", "phone": "9448888" },
        { "name": "Monika", "email": "MT@abv.bg", "phone": "4444" },
        { "name": "Katia", "email": "AK@abv.bg" , "phone": "5522"},
        { "name": "Nadia", "email": "N@abv.bg", "phone": "22532" }
        ];

        var l = partnersM.length,
            i;

        Partner.remove({});

        for (i = 0; i < l; i++) {
          //var partner = new Partner ({ 'id': i + 1, 'name': 'name', 'email': 'email', 'phone': 77777 });
            var partner = new Partner ({ 'id': i + 1, 'name': partnersM[i].name, 'email': partnersM[i].email, 'phone': partnersM[i].phone });
            partner.save();
            console.log (' svetla create partner table');
            console.log(partnersM[i].name);
        }
    }
}

module.exports = new DBSeeder();
