$(document).ready(function() {
    $(".photo-container").hover(
      function() {
        $(this).children(".overlay").fadeIn("fast");
      }, function() {
        $(this).children(".overlay").fadeOut("fast");
      }
    );
  });
  document.addEventListener("DOMContentLoaded", function() {
    const facilityCards = document.querySelectorAll(".facility-card");
    facilityCards.forEach(card => {
      card.addEventListener("mouseenter", function() {
        this.querySelector(".overlay").style.display = "block";
      });
      card.addEventListener("mouseleave", function() {
        this.querySelector(".overlay").style.display = "none";
      });
    });
  });
  