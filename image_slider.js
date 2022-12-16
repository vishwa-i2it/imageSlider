
"use strict";
exports.__esModule = true;
exports.ImageSlider = void 0;
require("./style.scss");
var mustache_1 = require("mustache");
var template_1 = require("./templates/template");
var ImageSlider = /** @class */ (function () {
    function ImageSlider(parentDiv, displayCount, moveCount,
        // eslint-disable-next-line
        data) {
        this.startIndex = 0;
        this.displayIndex = 0;
        this.displayCount = 0;
        this.moveCount = 0;
        // eslint-disable-next-line
        this.data = [];
        this.displayCount = displayCount;
        this.moveCount = moveCount;
        this.data = data;
        this.slideCount = data.length;
        this.renderSlider(parentDiv);
        this.showSlide();
    }
    ImageSlider.prototype.renderSlider = function (parentDiv) {
        var _this = this;
        var parentDivision = document.querySelector("." + parentDiv);
        if (parentDivision) {
            var sliderMain = (0, template_1.sliderTemplate)();
            parentDivision.innerHTML = mustache_1["default"].render(sliderMain, {});
            document
                .getElementById("slide_right_btn")
                .addEventListener("click", function () { return _this.forward(_this.moveCount); });
            document
                .getElementById("slide_left_btn")
                .addEventListener("click", function () { return _this.backward(_this.moveCount); });
        }
    };
    // eslint-disable-next-line
    ImageSlider.prototype.renderCard = function (data) {
        var card = (0, template_1.cardTemplate)();
        return mustache_1["default"].render(card, {
            imageSrc: data.url,
            buttonClass: data.buttonClass,
            buttonName: data.buttonName,
            buttonId: data.id
        });
    };
    ImageSlider.prototype.renderSlideBtn = function (id, className) {
        var slideBtn = (0, template_1.slideBtnTemplate)();
        return mustache_1["default"].render(slideBtn, {
            buttonClass: className,
            slideBtnId: id
        });
    };
    ImageSlider.prototype.showSlide = function (index) {
        if (index === void 0) { index = 0; }
        var cardContainer = document.querySelector(".card-container");
        var secondary_slide_container = document.querySelector(".secondary-slider-container");
        var card = [];
        var btn = [];
        for (var i = 0; i < this.slideCount; i++) {
            if (index == i) {
                this.displayIndex = index;
                for (var j = 0; j < this.displayCount; j++) {
                    if (this.displayIndex == this.slideCount) {
                        this.displayIndex = 0;
                    }
                    if (this.displayIndex < 0) {
                        this.displayIndex = this.slideCount;
                    }
                    card.push(this.renderCard(this.data[this.displayIndex]));
                    this.displayIndex++;
                }
                for (var k = 0; k < this.slideCount; k += this.moveCount) {
                    btn.push(this.renderSlideBtn(k, "slide-btn"));
                }
                cardContainer.innerHTML = card.join("");
                secondary_slide_container.innerHTML = btn.join("");
                i = this.displayCount + i - 1;
            }
        }
        this.initSlideBtn();
    };
    ImageSlider.prototype.initSlideBtn = function () {
        var _this = this;
        document.querySelectorAll(".slide-btn").forEach(function (btn) {
            return btn.addEventListener("click", function () {
                _this.startIndex = Number(btn.id);
                _this.showSlide(_this.startIndex);
            });
        });
    };
    ImageSlider.prototype.forward = function (count) {
        if (count === void 0) { count = 1; }
        this.startIndex += count;
        if (this.startIndex > this.slideCount - 1) {
            this.startIndex = 0;
        }
        this.showSlide(this.startIndex);
    };
    ImageSlider.prototype.backward = function (count) {
        if (count === void 0) { count = 1; }
        this.startIndex -= count;
        if (this.startIndex < 0) {
            this.startIndex = this.slideCount - this.moveCount;
            this.displayIndex = this.slideCount;
        }
        this.showSlide(this.startIndex);
    };
    return ImageSlider;
}());
exports.ImageSlider = ImageSlider;
module.exports = ImageSlider;
