let apiKey = "8bb49c17abff41f895c01c1db7377d4d";

function searchGames() {
    let name = document.getElementById("gameName").value;
    let games = document.getElementById("games");

    if (name == "") {
        games.innerHTML = "Введи назву гри!";
        return;
    }

    games.innerHTML = "Шукаємо ігри...";

    fetch("https://api.rawg.io/api/games?key=" + apiKey + "&search=" + encodeURIComponent(name))
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            games.innerHTML = "";

            if (data.results.length == 0) {
                games.innerHTML = "Ігор не знайдено!";
                return;
            }

            data.results.forEach(function(game) {
                games.innerHTML +=
                    '<div class="game">' +
                    '<img src="' + (game.background_image || "") + '" alt="">' +
                    '<h2>' + game.name + '</h2>' +
                    '<p>⭐ Рейтинг: ' + game.rating + '</p>' +
                    '<p>Дата виходу: ' + (game.released || "Невідомо") + '</p>' +
                    '</div>';
            });
        })
        .catch(function(error) {
            games.innerHTML = "Помилка! Перевір API-ключ та інтернет.";
        });
}