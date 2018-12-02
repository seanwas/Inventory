/*
 * Script for index.html
 * requires item.js
 */

// Force Strict Mode
"use strict";

// Execute only when document is ready (DOM loaded)
$(document).ready(() => {
  // Array to hold Items in Inventory
  var inventory = {};
  // Promise
  getInventoryData().then(data => {
    inventory = data;
  });

  // Bind Click Event Handlers
  $("#rootLink").click(e => {
    e.preventDefault();
    $("#mainInventory").hide();
    $("#mainSplash").show();
  });

  // Home
  $("#homeLogo").click(() => {
    getInventory(inventory, "home");
  });
  $("#homeBtn").click(e => {
    e.preventDefault();
    getInventory(inventory, "home");
  });

  // Auto
  $("#autoLogo").click(() => {
    getInventory(inventory, "auto");
  });
  $("#autoBtn").click(e => {
    e.preventDefault();
    getInventory(inventory, "auto");
  });

  // Business
  $("#businessLogo").click(() => {
    getInventory(inventory, "business");
  });
  $("#businessBtn").click(e => {
    e.preventDefault();
    getInventory(inventory, "business");
  });

  // Add Form Submit
  $("#addForm").submit(e => {
    e.preventDefault();

    // keyName equals key (home, auto, business) to pass through to function
    var keyName = $("#inventoryType")
      .html()
      .toLowerCase();

    inventory = addItem(
      inventory,
      $("#addItemName").val(),
      $("#addItemDesc").val(),
      $("#addItemValue").val(),
      $("#addItemPic").val(),
      keyName
    );
    var btn = `#${$("#inventoryType").html().toLowerCase()}Btn`;
    $(btn).click();
  });

  // Edit Form Submit
  $("#editForm").submit(e => {
    e.preventDefault();

    if (
      $("#itemName").val() === "" ||
      $("#itemDesc").val() === "" ||
      $("#itemValue").val() === "" ||
      $("#itemPic").val() === ""
    ) {
      alert("Please complete all fields.");
    } else {

      // keyname equals key (home, auto, business) to pass through to function
      var keyName = $("#inventoryType")
        .html()
        .toLowerCase();
      inventory = updateItem(
        inventory,
        $("#itemName").val(),
        $("#itemDesc").val(),
        $("#itemValue").val(),
        $("#itemPic").val(),
        keyName
      );
      var btn = `#${$("#inventoryType")
        .html()
        .toLowerCase()}Btn`;
      $(btn).click();
    }
  });

  // Modal
  $("#saveModalBtn").click(() => {
    $("#editForm").submit();
  });
});
