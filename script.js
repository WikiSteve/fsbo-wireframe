// Example seller-defined rules for the pilot transaction
const SELLER_RULES = {
    minimumOffer: 255000,
    closingWindow: {
        minDaysFromToday: 90,
        maxDaysFromToday: 120
    },
    depositAmount: 2500
};

let currentStep = 1;

let formData = {
    buyerName: '',
    buyerEmail: '',
    buyerPhone: '',
    offerPrice: '',
    closingDate: '',
    financingCondition: false,
    additionalComments: '',
    acknowledgment: false
};

function changeMainPhoto(src) {
    const mainPhoto = document.getElementById('mainPhoto');
    mainPhoto.src = src;
}

function openOfferForm() {
    const modal = document.getElementById('offerModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    currentStep = 1;
    showStep(1);
    setClosingDateBounds();
}

function closeOfferForm() {
    const modal = document.getElementById('offerModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    resetForm();
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    closeOfferForm();
}

function setClosingDateBounds() {
    const closingDateInput = document.getElementById('closingDate');
    const today = new Date();

    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + SELLER_RULES.closingWindow.minDaysFromToday);

    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + SELLER_RULES.closingWindow.maxDaysFromToday);

    const minDateString = minDate.toISOString().split('T')[0];
    const maxDateString = maxDate.toISOString().split('T')[0];

    closingDateInput.setAttribute('min', minDateString);
    closingDateInput.setAttribute('max', maxDateString);
}

function showStep(stepNumber) {
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    document.getElementById(`step${stepNumber}`).classList.add('active');
    updateProgressIndicator(stepNumber);
    currentStep = stepNumber;
}

function updateProgressIndicator(stepNumber) {
    for (let i = 1; i <= 3; i++) {
        const progressCircle = document.getElementById(`progress${i}`);
        if (i < stepNumber) {
            progressCircle.classList.remove('bg-blue-300', 'bg-white');
            progressCircle.classList.add('bg-green-500');
            progressCircle.innerHTML = '✓';
        } else if (i === stepNumber) {
            progressCircle.classList.remove('bg-blue-300', 'bg-green-500');
            progressCircle.classList.add('bg-white');
            progressCircle.classList.add('text-blue-700');
            progressCircle.innerHTML = i;
        } else {
            progressCircle.classList.remove('bg-white', 'bg-green-500', 'text-blue-700');
            progressCircle.classList.add('bg-blue-300');
            progressCircle.innerHTML = i;
        }
    }
}

function validateStep1() {
    const buyerName = document.getElementById('buyerName').value.trim();
    const buyerEmail = document.getElementById('buyerEmail').value.trim();
    const buyerPhone = document.getElementById('buyerPhone').value.trim();
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');

    let isValid = true;

    if (!buyerName) {
        nameError.classList.remove('hidden');
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!buyerEmail || !emailPattern.test(buyerEmail)) {
        emailError.classList.remove('hidden');
        isValid = false;
    }

    const digitsOnly = buyerPhone.replace(/\D/g, '');
    if (!buyerPhone || digitsOnly.length < 10) {
        phoneError.classList.remove('hidden');
        isValid = false;
    }

    if (isValid) {
        nameError.classList.add('hidden');
        emailError.classList.add('hidden');
        phoneError.classList.add('hidden');

        formData.buyerName = buyerName;
        formData.buyerEmail = buyerEmail;
        formData.buyerPhone = buyerPhone;

        return true;
    }

    if (buyerName) {
        nameError.classList.add('hidden');
    }

    if (buyerEmail && emailPattern.test(buyerEmail)) {
        emailError.classList.add('hidden');
    }

    if (buyerPhone && digitsOnly.length >= 10) {
        phoneError.classList.add('hidden');
    }

    formData.buyerName = buyerName;
    formData.buyerEmail = buyerEmail;
    formData.buyerPhone = buyerPhone;

    return false;
}

function validateStep2() {
    const offerPriceValue = parseFloat(document.getElementById('offerPrice').value);
    const priceError = document.getElementById('priceError');

    if (!offerPriceValue || offerPriceValue < SELLER_RULES.minimumOffer) {
        priceError.classList.remove('hidden');
        return false;
    }

    priceError.classList.add('hidden');
    formData.offerPrice = offerPriceValue;

    return true;
}

function validateStep3() {
    const closingDateInput = document.getElementById('closingDate');
    const closingDateValue = closingDateInput.value;
    const dateError = document.getElementById('dateError');
    const financingCondition = document.getElementById('financingCondition').checked;
    const acknowledgmentChecked = document.getElementById('disclosureAcknowledgment').checked;
    const ackError = document.getElementById('ackError');

    if (!closingDateValue) {
        dateError.classList.remove('hidden');
        dateError.textContent = 'Please select a closing date.';
        return false;
    }

    const selectedDate = new Date(closingDateValue);

    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + SELLER_RULES.closingWindow.minDaysFromToday);

    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + SELLER_RULES.closingWindow.maxDaysFromToday);

    if (selectedDate < minDate || selectedDate > maxDate) {
        dateError.classList.remove('hidden');
        dateError.textContent = 'Closing date must be between 90 and 120 days from today.';
        return false;
    }

    dateError.classList.add('hidden');

    if (!acknowledgmentChecked) {
        ackError.classList.remove('hidden');
        return false;
    }

    ackError.classList.add('hidden');

    formData.closingDate = closingDateValue;
    formData.financingCondition = financingCondition;
    formData.additionalComments = document.getElementById('additionalComments').value.trim();
    formData.acknowledgment = acknowledgmentChecked;

    return true;
}

function nextStep(fromStep) {
    let isValid = false;

    if (fromStep === 1) {
        isValid = validateStep1();
    } else if (fromStep === 2) {
        isValid = validateStep2();
    }

    if (isValid && fromStep < 3) {
        showStep(fromStep + 1);
    }
}

function prevStep(fromStep) {
    if (fromStep > 1) {
        showStep(fromStep - 1);
    }
}

function submitOffer(event) {
    event.preventDefault();

    if (!validateStep3()) {
        return;
    }

    console.log('Offer submitted:', formData);

    closeOfferForm();
    showSuccessModal();
}

function resetForm() {
    document.getElementById('offerForm').reset();
    formData = {
        buyerName: '',
        buyerEmail: '',
        buyerPhone: '',
        offerPrice: '',
        closingDate: '',
        financingCondition: false,
        additionalComments: '',
        acknowledgment: false
    };
    currentStep = 1;

    document.querySelectorAll('[id$="Error"]').forEach(error => {
        error.classList.add('hidden');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setClosingDateBounds();

    document.getElementById('offerModal').addEventListener('click', function(event) {
        if (event.target === this) {
            closeOfferForm();
        }
    });

    document.getElementById('successModal').addEventListener('click', function(event) {
        if (event.target === this) {
            closeSuccessModal();
        }
    });
});
