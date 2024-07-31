let app1 = angular.module('onlinetraining');

app1.controller('authController', function ($scope, AuthService) {
    $scope.isLoggedIn = AuthService.isLoggedIn(); // Ban đầu kiểm tra trạng thái đăng nhập

    // Lắng nghe sự kiện đăng nhập đã thay đổi
    $scope.$on('loginStatusChanged', function (event, isLoggedIn) {
        $scope.isLoggedIn = isLoggedIn;
    });
});

app1.controller('LoginController', function ($scope, AuthService) {
    $scope.login = function () {
        AuthService.login($scope.loginEmail, $scope.loginPassword)
            .then(function (response) {
                alert(response.message);
                $scope.$emit('loginStatusChanged', true); // Phát sự kiện đăng nhập thành công
            })
            .catch(function (error) {
                alert(error.message);
            });
    };
});

app1.controller('LogoutController', function ($scope, AuthService) {
    $scope.logout = function () {
        AuthService.logout() // Gọi hàm logout từ AuthService
            .then(function () {
                alert('Đăng xuất thành công');
                $scope.$emit('loginStatusChanged', false); // Phát sự kiện đăng xuất
            })
            .catch(function (error) {
                alert(error.message);
            });
    };
});

app1.controller('RegisterController', function ($scope, AuthService, $location) {
    $scope.register = function () {
        if ($scope.registerPassword !== $scope.registerConfirmPassword) {
            alert('Mật khẩu không khớp');
            return;
        }

        AuthService.register($scope.registerEmail, $scope.registerPassword)
            .then(function (response) {
                alert(response.message);
                $scope.$emit('loginStatusChanged', true); // Phát sự kiện đăng nhập thành công sau khi đăng ký
                $location.path();
            })
            .catch(function (error) {
                alert(error.message);
            });
    };
});

app1.service('AuthService', function ($q, $rootScope) {
    var currentUser = null;

    this.login = function (email, password) {
        var deferred = $q.defer();

        // Giả sử logic đăng nhập ở đây...

        // Đăng nhập thành công, lưu thông tin người dùng vào biến currentUser
        currentUser = { email: email };

        deferred.resolve({ message: 'Đăng nhập thành công' });

        // Phát sự kiện đăng nhập thành công
        $rootScope.$emit('loginStatusChanged', true);

        return deferred.promise;
    };

    this.logout = function () {
        var deferred = $q.defer();

        // Giả sử logic đăng xuất ở đây...

        // Xóa thông tin người dùng
        currentUser = null;

        deferred.resolve(); // Đăng xuất thành công

        // Phát sự kiện đăng xuất thành công
        $rootScope.$emit('loginStatusChanged', false);

        return deferred.promise;
    };

    this.register = function (email, password) {
        var deferred = $q.defer();

        // Kiểm tra xem người dùng đã tồn tại hay chưa
        // Giả sử logic kiểm tra ở đây...

        // Đăng ký thành công, lưu thông tin người dùng vào biến currentUser
        currentUser = { email: email };

        deferred.resolve({ message: 'Đăng ký thành công' });

        // Phát sự kiện đăng nhập thành công
        $rootScope.$emit('loginStatusChanged', true);

        return deferred.promise;
    };

    this.isLoggedIn = function () {
        // Kiểm tra nếu có người dùng hiện đã đăng nhập
        return currentUser !== null;
    };
});
