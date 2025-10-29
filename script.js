// Seller-defined rules
const SELLER_RULES = {
    minimumOffer: 400000,
    minimumDaysToClosing: 30
};

// Current step in the form
let currentStep = 1;

// Form data storage
let formData = {
    buyerName: '',
    buyerEmail: '',
    buyerPhone: '',
    offerPrice: '',
    financing: '',
    closingDate: '',
    contingencies: [],
    additionalComments: ''
};

/**
 * Change the main photo in the gallery
 */
function changeMainPhoto(src) {
    const mainPhoto = document.getElementById('mainPhoto');
    mainPhoto.src = src;
}

/**
 * Open the offer form modal
 */
function openOfferForm() {
    const modal = document.getElementById('offerModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    currentStep = 1;
    showStep(1);
    setMinClosingDate();
}

/**
 * Close the offer form modal
 */
function closeOfferForm() {
    const modal = document.getElementById('offerModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    resetForm();
}

/**
 * Show the success modal
 */
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

/**
 * Close the success modal
 */
function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    closeOfferForm();
}

/**
 * Set the minimum closing date based on seller rules
 */
function setMinClosingDate() {
    const closingDateInput = document.getElementById('closingDate');
    const today = new Date();
    const minDate = new Date(today.setDate(today.getDate() + SELLER_RULES.minimumDaysToClosing));
    const minDateString = minDate.toISOString().split('T')[0];
    closingDateInput.setAttribute('min', minDateString);
}

/**
 * Show a specific step in the form
 */
function showStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show the current step
    document.getElementById(`step${stepNumber}`).classList.add('active');
    
    // Update progress indicators
    updateProgressIndicator(stepNumber);
    
    currentStep = stepNumber;
}

/**
 * Update the progress indicator
 */
function updateProgressIndicator(stepNumber) {
    for (let i = 1; i <= 3; i++) {
        const progressCircle = document.getElementById(`progress${i}`);
        if (i < stepNumber) {
            // Completed steps
            progressCircle.classList.remove('bg-blue-300', 'bg-white');
            progressCircle.classList.add('bg-green-500');
            progressCircle.innerHTML = '✓';
        } else if (i === stepNumber) {
            // Current step
            progressCircle.classList.remove('bg-blue-300', 'bg-green-500');
            progressCircle.classList.add('bg-white');
            progressCircle.classList.add('text-blue-600');
            progressCircle.innerHTML = i;
        } else {
            // Future steps
            progressCircle.classList.remove('bg-white', 'bg-green-500');
            progressCircle.classList.add('bg-blue-300');
            progressCircle.classList.remove('text-blue-600');
            progressCircle.innerHTML = i;
        }
    }
}

/**
 * Validate step 1 (Buyer Information)
 */
function validateStep1() {
    const buyerName = document.getElementById('buyerName').value.trim();
    const buyerEmail = document.getElementById('buyerEmail').value.trim();
    const buyerPhone = document.getElementById('buyerPhone').value.trim();
    const nameError = document.getElementById('nameError');
    
    if (!buyerName) {
        nameError.classList.remove('hidden');
        return false;
    }
    
    nameError.classList.add('hidden');
    
    if (!buyerEmail || !buyerPhone) {
        return false;
    }
    
    // Store data
    formData.buyerName = buyerName;
    formData.buyerEmail = buyerEmail;
    formData.buyerPhone = buyerPhone;
    
    return true;
}

/**
 * Validate step 2 (Offer Price)
 */
function validateStep2() {
    const offerPrice = parseFloat(document.getElementById('offerPrice').value);
    const financing = document.getElementById('financing').value;
    const priceError = document.getElementById('priceError');
    
    if (!offerPrice || offerPrice < SELLER_RULES.minimumOffer) {
        priceError.classList.remove('hidden');
        return false;
    }
    
    priceError.classList.add('hidden');
    
    if (!financing) {
        return false;
    }
    
    // Store data
    formData.offerPrice = offerPrice;
    formData.financing = financing;
    
    return true;
}

/**
 * Validate step 3 (Closing Date)
 */
function validateStep3() {
    const closingDate = document.getElementById('closingDate').value;
    const dateError = document.getElementById('dateError');
    
    if (!closingDate) {
        dateError.classList.remove('hidden');
        dateError.textContent = 'Please select a closing date';
        return false;
    }
    
    // Check if closing date meets minimum requirement
    const selectedDate = new Date(closingDate);
    const today = new Date();
    const minDate = new Date(today.setDate(today.getDate() + SELLER_RULES.minimumDaysToClosing));
    
    if (selectedDate < minDate) {
        dateError.classList.remove('hidden');
        dateError.textContent = `Closing date must be at least ${SELLER_RULES.minimumDaysToClosing} days from today`;
        return false;
    }
    
    dateError.classList.add('hidden');
    
    // Store data
    formData.closingDate = closingDate;
    
    // Get contingencies
    const contingencies = [];
    document.querySelectorAll('input[name="contingency"]:checked').forEach(checkbox => {
        contingencies.push(checkbox.value);
    });
    formData.contingencies = contingencies;
    
    // Get additional comments
    formData.additionalComments = document.getElementById('additionalComments').value.trim();
    
    return true;
}

/**
 * Move to the next step
 */
function nextStep(fromStep) {
    let isValid = false;
    
    switch (fromStep) {
        case 1:
            isValid = validateStep1();
            break;
        case 2:
            isValid = validateStep2();
            break;
        case 3:
            isValid = validateStep3();
            break;
    }
    
    if (isValid && fromStep < 3) {
        showStep(fromStep + 1);
    }
}

/**
 * Move to the previous step
 */
function prevStep(fromStep) {
    if (fromStep > 1) {
        showStep(fromStep - 1);
    }
}

/**
 * Submit the offer form
 */
function submitOffer(event) {
    event.preventDefault();
    
    // Validate final step
    if (!validateStep3()) {
        return;
    }
    
    // In a real application, this would send data to a server
    console.log('Offer submitted:', formData);
    
    // Show success message
    closeOfferForm();
    showSuccessModal();
}

/**
 * Reset the form
 */
function resetForm() {
    document.getElementById('offerForm').reset();
    formData = {
        buyerName: '',
        buyerEmail: '',
        buyerPhone: '',
        offerPrice: '',
        financing: '',
        closingDate: '',
        contingencies: [],
        additionalComments: ''
    };
    currentStep = 1;
    
    // Hide all error messages
    document.querySelectorAll('[id$="Error"]').forEach(error => {
        error.classList.add('hidden');
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    setMinClosingDate();
    
    // Close modal when clicking outside
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
