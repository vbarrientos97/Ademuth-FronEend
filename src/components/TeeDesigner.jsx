import React, { useEffect } from "react";
import { fabric } from "fabric";
import background_tshirt from "../images/background_tshirt.png";
import batman from "../images/batman.png";
import "../custom.css";
import ProductsCarousel from "./ProductsCarousel";
import im1 from "../carousel-images/im1.jpg";
import im2 from "../carousel-images/im2.jpg";
import im3 from "../carousel-images/im3.jpg";
import im4 from "../carousel-images/im4.jpg";
import im5 from "../carousel-images/im5.jpg";

function TeeDesigner() {
  const images = [im1, im2, im3, im4, im5];
  useEffect(() => {
    const canvas = new fabric.Canvas("tshirt-canvas");
    const tshirtBackgroundImg = new Image();
    tshirtBackgroundImg.src = background_tshirt;

    // Function to update the T-shirt image on the canvas
    function updateTshirtImage(imageURL) {
      fabric.Image.fromURL(imageURL, function (img) {
        img.scaleToHeight(300);
        img.scaleToWidth(300);
        canvas.centerObject(img);
        canvas.add(img);
        canvas.renderAll();
      });
    }

    //Event listener for changing T-shirt color
    document.getElementById("tshirt-color").addEventListener(
      "change",
      function () {
        document.getElementById("tshirt-div").style.backgroundColor =
          this.value;
      },
      false
    );

    // Event listener for selecting a local T-shirt design
    document.getElementById("tshirt-local-design").addEventListener(
      "change",
      function () {
        updateTshirtImage(this.value);
      },
      false
    );

    // Event listener for uploading a custom T-shirt picture
    document.getElementById("tshirt-custom-design").addEventListener(
      "change",
      function (e) {
        var reader = new FileReader();

        reader.onload = function (event) {
          var imgObj = new Image();
          imgObj.src = event.target.result;

          // When the picture loads, create the image in Fabric.js
          imgObj.onload = function () {
            var img = new fabric.Image(imgObj);

            img.scaleToHeight(300);
            img.scaleToWidth(300);
            canvas.centerObject(img);
            canvas.add(img);
            canvas.renderAll();
          };
        };

        // If the user selected a picture, load it
        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
        }
      },
      false
    );

    // Function to obtain selected data
    function getSelectedData() {
      const tshirtDesign = document.getElementById("tshirt-local-design").value;
      const tshirtColor = document.getElementById("tshirt-color").value;
      const customPictureInput = document.getElementById(
        "tshirt-custom-design"
      );
      const tshirtCustomPicture =
        customPictureInput.files.length > 0
          ? customPictureInput.files[0].name
          : null;

      const selectedData = {
        localDesign: tshirtDesign,
        color: tshirtColor,
        customDesign: tshirtCustomPicture,
      };

      return selectedData;
    }

    // Event listener for the Save button
    document
      .getElementById("save-button")
      .addEventListener("click", function () {
        const selectedData = getSelectedData();
        //Here you can use selected data to generate the sales order or perform other actions.
        console.log(selectedData);
      });

    // Clean up the event listeners on component unmount
    return () => {
      document
        .getElementById("tshirt-color")
        .removeEventListener("change", null);
      document
        .getElementById("tshirt-local-design")
        .removeEventListener("change", null);
      document
        .getElementById("tshirt-custom-design")
        .removeEventListener("change", null);
      document.getElementById("save-button").removeEventListener("click", null);
    };
  }, []);

  return (
    <div>
      <div>
        <div id="tshirt-div">
          <img
            alt="imagen de camiseta basica"
            id="tshirt-backgroundpicture"
            src={background_tshirt}
          />
          <div id="drawingArea" className="drawing-area">
            <div className="canvas-container">
              <canvas id="tshirt-canvas" width="200" height="400"></canvas>
            </div>
          </div>
        </div>

        <form>
          <label htmlFor="tshirt-local-design">T-Shirt Design:</label>
          <select id="tshirt-local-design">
            <option value="">Select one of our designs ...</option>
            <option value={batman}>Batman</option>
          </select>

          <label htmlFor="tshirt-color">T-Shirt Color:</label>
          <select id="tshirt-color">
            <option value="#fff">White</option>
            <option value="#000">Black</option>
            <option value="#f00">Red</option>
            <option value="#008000">Green</option>
            <option value="#ff0">Yellow</option>
          </select>

          <label htmlFor="tshirt-custom-design">Upload your own design:</label>
          <input type="file" id="tshirt-custom-design" />

          <button id="save-button">Save</button>
        </form>
      </div>
      <div>
        <ProductsCarousel images={images} />
      </div>
    </div>
  );
}

export default TeeDesigner;
