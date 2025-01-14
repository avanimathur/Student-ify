$(document).ready(function () {
    $("#menu1").click();
    $('.question').click(function () {
        $(this).toggleClass('question-change');
        $(this).find('.arrow-custom').toggleClass('close-arrow');
        $(this).next('.answer').slideToggle();
    });
});

function changeSection(category) {
    $('.mensection').hide();
    $('#faq-content-' + category).show();
    $('.menu').removeClass('active');
    $('.' + category).addClass('active');
}

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

$(document).ready(function () {

    $(".CheckboxContainer .container").click(function () {

        $("input[type='checkbox']").click(function (e) {

            $div = $(this).parent();
            text = $div[0].firstChild.nodeValue;
            id_text = text.replace(/\s+/g, "");
            id_text = id_text.replace("&", "_");

            if ($(this).prop("checked") == true) {
                $(".sf-filtertags ul").prepend("<li>" + text + "<a href='#' name='" + text + "' id='" + id_text + "' onclick='removeTagAndUncheck(this.id,this.name)'> X </a></li>");
            }
            else {
                $("#" + id_text).parent().remove();
            }

            clearAllShowHide();
            e.stopImmediatePropagation();
        });
    });

    $('.dropdown-submenu a.submenu').on("click", function (e) {
        $.each($(".dropdown-submenu div.dropdown-menu"), function () {
            if ($(this).is(":visible")) {
                if ($("div").index($(this).parent()) != $("div").index($(e.target).next('div.dropdown-menu').parent())) {
                    $(this).css("display", "none");
                    $(this).parent().find("i").removeClass("fa-angle-right");
                    $(this).parent().find("i").addClass("fa-angle-down");
                }
            }
        });

        $(e.target).next('div').toggle();

        if (($(e.target).next('div')).is(":visible")) {
            $(e.target).find("i").removeClass("fa-angle-down");
            $(e.target).find("i").addClass("fa-angle-right");
        }
        else {
            $(e.target).find("i").removeClass("fa-angle-right");
            $(e.target).find("i").addClass("fa-angle-down");
        }
        e.stopPropagation();
        e.preventDefault();
    });

    $(".dropdown").on("show.bs.dropdown", function (event) {
        $(event.target).find("div.dropdown-menu").css("display", "table");
        $(event.target).find("i").removeClass("fa-angle-right");
        $(event.target).find("i").addClass("fa-angle-down");
    });
    $(".dropdown").on("shown.bs.dropdown", function () {
        $('.dropdown-submenu a.submenu').next('div').toggle();
    });
    $(".dropdown").on("hide.bs.dropdown", function (event) {
        $(event.target).find("div.dropdown-menu").css("display", "none");
    });
});

function clearAllShowHide() {
    if ($('.sf-filtertags ul li').length > 2) {
        $("#clearAllTags").css("visibility", "visible");
    } else {
        $("#clearAllTags").css("visibility", "hidden");
    }
}

function removeTagAndUncheck(id, name) {
    $("input[name='" + name.trim() + "']:checkbox").prop('checked', false);
    $("#" + id).parent().remove();
    clearAllShowHide();
}

function clearAllTags() {
    $('.sf-filtertags ul').empty();
    $('.sf-filtertags ul').prepend('<li id="clearAllTags" style="border:none;visibility: hidden;" onclick="clearAllTags()"><a href="#">Clear All</a></li>');
    $('input:checkbox').removeAttr('checked');
    clearAllShowHide();
}

$(document).on("focusin", function (event) {
    var $trigger = $(".dropdown");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $(".dropdown-menu").slideUp("fast");
    }
});

$(window).click(function () {
    $(".dropdown-menu").slideUp("fast");
});

$('a').click(function () {
    if ($(this).text().trim() == 'Show More') {
        $(this).html('Show Less <i class="fa fa-chevron-up"></i>');
    }
    else if ($(this).text().trim() == 'Show Less') {
        $(this).html('Show More <i class="fa fa-chevron-down"></i>');
    }
});