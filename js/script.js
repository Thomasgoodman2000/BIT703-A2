// ========================================
// Aotearoa Adventure Gear - Custom Script
// Thomas Goodman 5113852
// ========================================

document.addEventListener("DOMContentLoaded", function () {
    setupScrollButton();
    setupFreeShipping();
    setupCheckoutButtons();
    setupPaymentSelection();
});

// Floating anchor button
function setupScrollButton() {
    const scrollBtn = document.getElementById("scrollTopBtn");

    if (!scrollBtn) return;

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollBtn.style.display = "flex";
        } else {
            scrollBtn.style.display = "none";
        }
    });
}

// Free shipping logic for shipping page
function setupFreeShipping() {
    const subtotalElement = document.getElementById("subtotalAmount");
    const shippingElement = document.getElementById("shippingAmount");
    const totalElement = document.getElementById("totalAmount");
    const shippingText = document.getElementById("shippingMessage");

    if (!subtotalElement || !shippingElement || !totalElement) return;

    const subtotal = parseFloat(subtotalElement.dataset.subtotal);

    let shippingCost = 20;

    if (subtotal >= 600) {
        shippingCost = 0;

        if (shippingText) {
            shippingText.textContent = "Free shipping has been applied because your order is over $600.";
        }
    } else {
        if (shippingText) {
            shippingText.textContent = "Orders over $600 automatically receive free shipping.";
        }
    }

    shippingElement.textContent = shippingCost === 0 ? "FREE" : "$" + shippingCost.toFixed(2);
    totalElement.textContent = "$" + (subtotal + shippingCost + 13).toFixed(2);
}

// Simple next/cancel demo buttons
function setupCheckoutButtons() {
    const nextButtons = document.querySelectorAll(".next-page-btn");
    const cancelButtons = document.querySelectorAll(".cancel-btn");

    nextButtons.forEach(button => {
        button.addEventListener("click", function () {
            const nextPage = this.dataset.next;
            if (nextPage) {
                window.location.href = nextPage;
            }
        });
    });

    cancelButtons.forEach(button => {
        button.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    });
}

// Payment selection highlight
function setupPaymentSelection() {
    const paymentOptions = document.querySelectorAll(".payment-option");

    if (!paymentOptions.length) return;

    paymentOptions.forEach(option => {
        option.addEventListener("click", function () {
            paymentOptions.forEach(item => item.classList.remove("card-option-selected"));
            this.classList.add("card-option-selected");
        });
    });
}
// Shipping form validation
const shippingForm = document.getElementById("shippingForm");

if (shippingForm) {
    shippingForm.addEventListener("submit", function (event) {
        if (!shippingForm.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        shippingForm.classList.add("was-validated");
    });

    const nextButton = document.querySelector(".next-page-btn");

    if (nextButton) {
        nextButton.addEventListener("click", function () {
            if (shippingForm.checkValidity()) {
                window.location.href = "payment.html";
            } else {
                shippingForm.classList.add("was-validated");
            }
        });
    }
}
// Payment form validation
const paymentForm = document.getElementById("paymentForm");

if (paymentForm) {
    paymentForm.addEventListener("submit", function (event) {
        const paypalSelected = document.getElementById("paypalOption")?.checked;
        const creditSelected = document.getElementById("creditCardOption")?.checked;

        const cardNumber = document.getElementById("cardNumber");
        const expiryDate = document.getElementById("expiryDate");
        const cvv = document.getElementById("cvv");
        const cardHolder = document.getElementById("cardHolder");

        if (paypalSelected) {
            cardNumber.removeAttribute("required");
            expiryDate.removeAttribute("required");
            cvv.removeAttribute("required");
            cardHolder.removeAttribute("required");
        } else if (creditSelected) {
            cardNumber.setAttribute("required", "required");
            expiryDate.setAttribute("required", "required");
            cvv.setAttribute("required", "required");
            cardHolder.setAttribute("required", "required");
        }

        if (!paymentForm.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            alert("Payment submitted successfully.");
        }

        paymentForm.classList.add("was-validated");
    });
}