angular.module("onlinetraining", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/trangchu", {
                templateUrl: "trangchu.html"
            })
            .when("/gioithieu", {
                templateUrl: "gioithieu.html"
            })
            .when("/hoidap", {
                templateUrl: "hoidap.html"
            })
            // .when("/lienhe", {
            //     templateUrl: "lienhe.html"
            // })
            .otherwise({
                redirectTo: "/trangchu"
            });
    })
app.controller('authController', function ($scope, $http) {
    $scope.login = function () {
        const user = {
            taikhoan: $scope.loginEmail,
            matkhau: $scope.loginPassword
        };

        $http.post('http://localhost:3000/login', user)
            .then(response => {
                alert(response.data.message);
            })
            .catch(error => {
                alert(error.data.message);
            });
    };

    $scope.register = function () {
        const newUser = {
            taikhoan: $scope.registerEmail,
            matkhau: $scope.registerPassword
        };

        $http.post('http://localhost:3000/register', newUser)
            .then(response => {
                alert(response.data.message);
            })
            .catch(error => {
                alert(error.data.message);
            });
    };
});

