/*
 * Script for index.html
 * required by scripts.js
 * requires item.js
 */

// Force Strict Mode
"use strict";

/*
 * function to load items in Inventory from JSON file
 * 
 * @return data - items in Inventory
 */
function getInventoryData() {
  return $.getJSON("data/inventory.json", function(data) {
    return data;
  });
}

/*
 * function to get Items in Inventory for type home
 * 
 * @param inventory - Array of Item Objects
 */
function getInventory(inventory, keyName) {
  // keyname === home, auto or business sent from EventHandler
  $("#mainSplash").hide();
  $("#imgPath").html("img/inventory/" + keyName);
  $("#inventoryItemsList").html("");

  // Loop through Inventory to get Items for home, auto, business
  var itemCount = 0;
  $.each(inventory, (key, items) => {
    // Key == home, auto, business
    if (key === keyName) {
      $.each(items, (index, item) => {
        var newItem = new Item(
          item.itemName,
          item.itemDesc,
          item.itemValue,
          item.itemPic
        );
        $("#inventoryItemsList").append(
          $("<div>")
            .attr("class", "card")
            .append(
              $("<div>")
                .attr("class", "card-body")
                .append(
                  $("<img>")
                    .attr("class", "card-img-top")
                    .attr(
                      "src",
                      `img/inventory/${keyName}/${newItem.getItemPic()}`
                    )
                    .attr("alt", newItem.getItemName())
                )
                .append(
                  $("<span>")
                    .attr("class", "card-text")
                    .html(newItem.getItemName())
                )
                .append("<br>")
                .append(
                  $("<span>")
                    .attr("class", "card-text")
                    .html(newItem.getItemDesc())
                )
                .append("<br>")
                .append(
                  $("<span>")
                    .attr("class", "card-text")
                    .html(`&#x24;${newItem.getItemValue()}`)
                )
                .append(
                  $("<div>")
                    .attr("class", "float-right")
                    .append(
                      $("<a>")
                        .attr("href", "#")
                        .attr("class", "btn btn-info item-action")
                        .attr("data-toggle", "modal")
                        .attr("data-target", "#editModel")
                        .html('<i class="fas fa-pencil-alt"></i> Edit')
                        .click(() => {
                          editItem(keyName, newItem);
                          var btn = "#" + keyName + "Btn";
                          $(btn).click();
                        })
                    )
                    .append($("<span>").html(" "))
                    .append(
                      $("<a>")
                        .attr("href", "#")
                        .attr("class", "btn btn-danger item-action")
                        .html('<i class="fas fa-trash-alt"></i> Delete')
                        .click(() => {
                          inventory = deleteItem(inventory, newItem, keyName);
                          var btn = "#" + keyName + "Btn";
                          $(btn).click();
                        })
                    )
                )
            )
        );
        itemCount++;
      });
    }
  });

  // Update HTML Elements for display
  var properKeyName = keyName.slice(0, 1).toUpperCase() + keyName.slice(1); //TitleCase keyName for HTML display and css
  $("#itemCount").html(itemCount);
  $("#inventoryType").html(properKeyName);
  $("#inventoryType").attr("class", "display-3 inventoryType" + properKeyName);
  $("#inventoryTypeLogo").attr("src", "img/" + keyName + ".png");
  $("#inventoryTypeLogo").attr("alt", properKeyName + " Inventory");

  $("#mainInventory").show();
}
