# FSBO Wireframe

Wireframe for a FSBO (For Sale By Owner) real estate portal.

## Features

- **Responsive Design**: Built with Tailwind CSS for mobile, tablet, and desktop compatibility
- **Property Details Page**: 
  - Interactive photo gallery with clickable thumbnails
  - Property information (bedrooms, bathrooms, square footage, year built)
  - Comprehensive property description
  - Property Disclosure Statement (PDS)
  - Seller-defined submission rules
  
- **Multi-Step Offer Form**:
  - Step 1: Buyer information (name, email, phone)
  - Step 2: Offer details (price, financing type)
  - Step 3: Closing information (date, contingencies, comments)
  - Real-time form validation based on seller rules
  - Progress indicator showing current step
  
- **Seller-Defined Rules**:
  - Minimum offer amount validation ($400,000)
  - Minimum closing date validation (30 days from today)
  - Automatic date picker constraints

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/WikiSteve/fsbo-wireframe.git
cd fsbo-wireframe
```

2. Install dependencies:
```bash
npm install
```

3. Build the Tailwind CSS:
```bash
npx tailwindcss -i ./input.css -o ./styles.css
```

### Development

To rebuild CSS when making changes to Tailwind classes:
```bash
npx tailwindcss -i ./input.css -o ./styles.css --watch
```

### Running the Application

1. Start a local web server (using Python):
```bash
python3 -m http.server 8000
```

2. Open your browser and navigate to:
```
http://localhost:8000
```

Alternatively, you can use any static file server or simply open `index.html` directly in your browser.

## Project Structure

```
fsbo-wireframe/
├── index.html           # Main HTML wireframe
├── script.js            # JavaScript for form logic and validation
├── styles.css           # Generated Tailwind CSS (do not edit manually)
├── input.css            # Tailwind CSS input file
├── tailwind.config.js   # Tailwind configuration
├── package.json         # Node.js dependencies
└── README.md           # This file
```

## Customization

### Modifying Seller Rules

Edit the `SELLER_RULES` object in `script.js`:

```javascript
const SELLER_RULES = {
    minimumOffer: 400000,        // Minimum offer amount in dollars
    minimumDaysToClosing: 30     // Minimum days until closing
};
```

### Styling Changes

1. Modify Tailwind classes in `index.html`
2. Rebuild CSS: `npx tailwindcss -i ./input.css -o ./styles.css`

### Property Information

Update the property details directly in `index.html`:
- Property photos (image URLs)
- Property statistics (bedrooms, bathrooms, etc.)
- Description text
- PDS information

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

ISC
