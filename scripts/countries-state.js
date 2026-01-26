// Список стран
const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Ukraine",
    "Australia",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Netherlands",
    "Belgium",
    "Switzerland",
    "Austria",
    "Sweden",
    "Denmark",
    "Norway",
    "Finland",
    "Ireland",
    "Japan",
    "South Korea",
    "Singapore",
    "New Zealand",
    "Mexico",
    "Brazil",
    "Argentina",
    "Chile",
    "Poland",
    "Czech Republic",
    "Portugal",
    "Greece",
    "Israel",
    "United Arab Emirates",
    "Saudi Arabia",
    "Qatar",
    "Hong Kong",
    "Taiwan",
    "Thailand",
    "Malaysia",
    "Indonesia",
    "Philippines",
    "India",
    "China",
    "Turkey",
    "South Africa",
    "Egypt"
];

// Штаты США
const usStates = [
    { value: "", label: "State" },
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
    { value: "DC", label: "District of Columbia" }
];

// Провинции Канады
const canadaProvinces = [
    { value: "", label: "Province" },
    { value: "AB", label: "Alberta" },
    { value: "BC", label: "British Columbia" },
    { value: "MB", label: "Manitoba" },
    { value: "NB", label: "New Brunswick" },
    { value: "NL", label: "Newfoundland and Labrador" },
    { value: "NT", label: "Northwest Territories" },
    { value: "NS", label: "Nova Scotia" },
    { value: "NU", label: "Nunavut" },
    { value: "ON", label: "Ontario" },
    { value: "PE", label: "Prince Edward Island" },
    { value: "QC", label: "Quebec" },
    { value: "SK", label: "Saskatchewan" },
    { value: "YT", label: "Yukon" }
];

// Штаты Австралии
const australiaStates = [
    { value: "", label: "State" },
    { value: "NSW", label: "New South Wales" },
    { value: "VIC", label: "Victoria" },
    { value: "QLD", label: "Queensland" },
    { value: "WA", label: "Western Australia" },
    { value: "SA", label: "South Australia" },
    { value: "TAS", label: "Tasmania" },
    { value: "ACT", label: "Australian Capital Territory" },
    { value: "NT", label: "Northern Territory" }
];

// Функция для заполнения списка стран
function populateCountries() {
    const countrySelects = document.querySelectorAll('.co-form__select');

    countrySelects.forEach((select, index) => {
        if (index === 0) {
            select.innerHTML = '';
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country;
                option.textContent = country;
                select.appendChild(option);
            });
        }
    });
}

// Функция для проверки, нужен ли state/province для страны
function countryHasRegions(country) {
    return country === 'United States' || country === 'Canada' || country === 'Australia';
}

// Функция для обновления макета формы
function updateFormLayout(country) {
    const formRow = document.querySelector('.co-form__row--three-cols, .co-form__row--two-cols');

    if (!formRow) return;

    if (countryHasRegions(country)) {
        // Показываем версию с тремя колонками (City, State, ZIP)
        formRow.className = 'co-form__row co-form__row--three-cols';
        formRow.innerHTML = `
            <div class="co-form__group">
                <input type="text" class="co-form__input" placeholder="City">
            </div>
            <div class="co-form__group">
                <select class="co-form__select co-form__select--state">
                    <option>State</option>
                </select>
            </div>
            <div class="co-form__group">
                <input type="text" class="co-form__input" placeholder="ZIP code">
            </div>
        `;

        // Заполняем штаты/провинции
        updateRegions(country);
    } else {
        // Показываем версию с двумя колонками (City, Postal code)
        formRow.className = 'co-form__row co-form__row--two-cols';
        formRow.innerHTML = `
            <div class="co-form__group">
                <input type="text" class="co-form__input" placeholder="City">
            </div>
            <div class="co-form__group">
                <input type="text" class="co-form__input" placeholder="Postal code">
            </div>
        `;
    }
}

// Функция для обновления списка штатов/провинций
function updateRegions(country) {
    const stateSelect = document.querySelector('.co-form__select--state');

    if (!stateSelect) return;

    stateSelect.innerHTML = '';

    let regions;
    if (country === 'United States') {
        regions = usStates;
    } else if (country === 'Canada') {
        regions = canadaProvinces;
    } else if (country === 'Australia') {
        regions = australiaStates;
    }

    if (regions) {
        regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region.value;
            option.textContent = region.label;
            stateSelect.appendChild(option);
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    populateCountries();

    const countrySelect = document.querySelector('.co-form__select');
    if (countrySelect) {
        // Инициализация формы для выбранной страны по умолчанию
        updateFormLayout(countrySelect.value);

        // Обновление при изменении страны
        countrySelect.addEventListener('change', function() {
            updateFormLayout(this.value);
        });
    }
});