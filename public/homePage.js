"use strict";

const logoutButton = new LogoutButton();
logoutButton.action = function() {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        } else {
            alert(`Ошибка выхода: ${response.error}`);
            console.error(response.error);
        }
    });
};

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    } else {
        alert(`Ошибка получения данных: ${response.error}`);
        console.error(response.error);
    }
});

const ratesBoard = new RatesBoard();
function getRates() {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        } else {
            alert(`Ошибка получения курсов: ${response.error}`);
            console.error(response.error);
        }
    });
}

getRates();
setInterval(getRates, 60000); 

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Баланс успешно пополнен!");
        } else {
            moneyManager.setMessage(false, `Ошибка пополнения: ${response.error}`);
            console.error(response.error);
        }
    });
};

moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Конвертация успешна!");
        } else {
            moneyManager.setMessage(false, `Ошибка конвертации: ${response.error}`);
            console.error(response.error);
        }
    });
};

moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Перевод успешен!");
        } else {
            moneyManager.setMessage(false, `Ошибка перевода: ${response.error}`);
            console.error(response.error);
        }
    });
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        favoritesWidget.updateUsersList(response.data);
    } else {
        alert(`Ошибка получения избранного: ${response.error}`);
        console.error(response.error);
    }
});

favoritesWidget.addUserCallback = function(userId) {
    ApiConnector.addUserToFavorites(userId, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            favoritesWidget.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Пользователь добавлен в избранное!");
        } else {
            favoritesWidget.setMessage(false, `Ошибка добавления: ${response.error}`);
            console.error(response.error);
        }
    });
};

favoritesWidget.removeUserCallback = function(userId) {
    ApiConnector.removeUserFromFavorites(userId, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            favoritesWidget.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Пользователь удален из избранного!");
        } else {
            favoritesWidget.setMessage(false, `Ошибка удаления: ${response.error}`);
            console.error(response.error);
        }
    });
};