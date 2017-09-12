/**
 * Created by jillvandendriessche on 11/14/15.
 */

// Global array for images
var characters = ['Cersei Lannister', 'Daenarys Targaryen', 'Maester Varys', 'Margarey Tyrell', 'Petyr Baelish', 'Samwell Tarly', 'Sansa Stark'];

var activeElement = 0;


var generateLists = function () {
    for (var i = 0, len = characters.length; i < len; i++) {
        var imgurl = characters[i].replace(' ', '-'); // Opzettelijk nog niet met regex. Items zijn zo gemaakt dat er maar 1 spatie inzit
        $('.carousel').append('<li class="hidden"><figure><img src="images/' + imgurl.toLocaleLowerCase() + '-1920.jpg" alt="' + characters[i] + '" title="' + characters[i] + '" /><figcaption>' + characters[i] + '</figcaption></figure></li>');
    }

    // Show only the first item
    $('.carousel li:first').addClass('visible').fadeIn();
    console.log('list generated');
};


// Ik verwacht nog niet dat ze dit zo oplossen (met this), ze mogen voor elk van de 2 links een andere event handler koppelen en het zo oplossen, dan toon ik ze in de les een efficiëntere manier
var changeCarousel = function (e) {
    e.preventDefault();

    if ($(this).hasClass('previous') && (activeElement >0)) {
        swapElement(-1)
    } else if ($(this).hasClass('next') && (activeElement  < characters.length-1)) {
        swapElement(1)
    }
};

var swapElement = function (order) {
    $('.carousel .visible').fadeOut();
    var li = $('.carousel li')[activeElement + order];
    $(li).addClass('visible').fadeIn();
    activeElement = activeElement + order;
};

var castVote = function () {
    console.log('gestemd',$(this))
    // Opzoeken in html -> ik weet dat het niet ideaal is maar anders moesten ze zoeken in een array van objecten, wat ik nu wil vermijden
    // Het is een oefening op jQuery he :-)

    var character = $(this).find('figcaption').text();
    var voteMatch = $(".votes li:contains('" + character + "')");
    if (voteMatch.length > 0) {
        // Breedte van de span aanpassen

        var amount = parseInt($(voteMatch).children('span').text()) + 1;
        $(voteMatch).children('span').css('width', amount * 10).text(amount);
    } else {console.log(character);
        $('.votes').append('<li><strong>' + character + '</strong><span>' + 1 + '</span>');

    }

};


var countBets = function () {
    // Hier wordt het lastig dat we alles uit de HTML moeten halen

    if ($('.votes li').length > 0) {
        var highest = {character: '', votes: 0};  // Ze mogen dit ook met 2 variabelen oplossen

        // Dit is wat lastig zonder array methodes maar bon jullie snappen de "entry level" wel he. Betere oplossingen die eenvoudig zijn voor de studenten altijd welkom
        $.each($('.votes li'), function (index, element) {
            console.log($(element), parseInt($(element).children('span')) > highest.votes, parseInt($(element).children('span')), highest.votes)
            if (parseInt($(element).children('span').text()) > highest.votes) {
                highest.votes = parseInt($(element).children('span').text());
                highest.character = $(element).children('strong').text();
            }
        });

        window.alert('Congratulations! ' + highest.character + ' won by ' + highest.votes + ' votes')
        console.log(highest);
    }
};


$(document).ready(function () {

    // Generate list items
    generateLists();

    // Bind events
    $('.sequence a').on('click', changeCarousel);

    $('.carousel figure').on('click', castVote); // Ja een delegate... k had die willen vermijden maar bon, ik geef er alvast uitleg bij in de theorie en als die die het niet snappen het doen via een binding wanneer ze het aanmaken is t mij ook goed

    $('.finish').on('click', countBets);


});
