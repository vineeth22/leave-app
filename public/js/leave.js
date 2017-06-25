$(document).ready(function () {
    $("#login").click(function () {
        var data = new Object();
        data.username = $("#username").val();
        data.role = $("#role").val();

        $.ajax({
            url: 'login',
            data: JSON.stringify(data),
            type: 'POST',
            contentType: 'application/json; charset=UTF-8'
        })
            .done(function (res) {
                $("#output").text(JSON.stringify(res), null, 2);
            })
            .fail(function (xhr) {
                $("#output").text(xhr.responseText);
            })
    });

    $("#createLeave").click(function () {
        var data = new Object();
        data.startDate = $("#startDate").val();
        data.endDate = $("#endDate").val();
        data.leaveType = $("#leaveType").val();
        data.reason = $("#reason").val();

        $.ajax({
            url: 'createLeave',
            data: JSON.stringify(data),
            type: 'POST',
            contentType: 'application/json; charset=UTF-8'
        })
            .done(function (res) {
                $("#output").text(JSON.stringify(res), null, 2);
            })
            .fail(function (xhr) {
                $("#output").text(xhr.responseText);
            })
    });
    $("#getLeave").click(function () {

        $.ajax({
            url: 'getLeave',
            type: 'GET',
        })
            .done(function (res) {
                $("#output").text(JSON.stringify(res, null, 2));
            })
            .fail(function (xhr) {
                $("#output").text(xhr.responseText);
            })
    });
    $("#approveLeave").click(function () {
        var data = new Object();
        data.objectId = $("#objectId").val();

        $.ajax({
            url: 'approveLeave',
            data: JSON.stringify(data),
            type: 'PUT',
            contentType: 'application/json; charset=UTF-8'
        })
            .done(function (res) {
                $("#output").text(JSON.stringify(res), null, 2);
            })
            .fail(function (xhr) {
                $("#output").text(xhr.responseText);
            })
    });
});
