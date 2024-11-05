<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dairy Shed Hygiene Checklist</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css">
    <style>
        body {
            background-color: #002B5C;
            color: #FFFFFF;
            font-family: Arial, sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            margin: 0;
        }

        .container {
            background-color: #002B5C;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
            max-width: 800px;
            width: 100%;
        }

        h1,
        h2 {
            color: #a7ab01;
            text-align: center;
        }

        h1 {
            margin-bottom: 40px;
        }

        label {
            margin-top: 10px;
        }

        button {
            background-color: #FF851B;
            color: #FFFFFF;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            display: block;
            margin: 20px auto;
            border-radius: 5px;
        }

        button:hover {
            background-color: #FF4136;
        }

        .checklist-item {
            margin-bottom: 30px;
        }

        .form-control,
        .form-select {
            margin-top: 5px;
        }

        .version {
            text-align: center;
            margin-top: 20px;
            color: #FFFFFF;
            font-size: 12px;
        }

        .logo {
            display: block;
            margin: 0 auto 20px;
            width: 250px;
        }

        .record-container {
            background-color: #FFFFFF;
            color: #000000;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
            max-width: 1000px;
            width: 100%;
            margin: 20px auto;
        }

        .record-container h2 {
            color: #002B5C;
        }

        .record-list {
            max-height: 400px;
            overflow-y: auto;
        }

        .record-list a {
            text-decoration: none;
            color: #007bff;
            display: block;
            margin-bottom: 10px;
        }

        .back-button {
            margin-top: 20px;
            background-color: #002B5C;
            color: #FFFFFF;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
        }

        .search-container {
            margin-bottom: 20px;
        }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.15.0/firebase-storage-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore-compat.js"></script>
</head>

<body>
    <div class="container" id="form-container">
        <img src="https://i.postimg.cc/htZPjx5g/logo-89.png" alt="Logo" class="logo">
        <h1>Dairy Shed Hygiene Checklist</h1>

        <form id="hygiene-checklist-form">
            <!-- Form Fields -->
            <div class="section mb-4">
                <h2>Farm Details</h2>
                <label for="dairy-number">Dairy Number:</label>
                <input type="text" class="form-control" id="dairy-number" name="dairy-number" onblur="fetchFarmDetails()">

                <label for="dairy-company">Dairy Company:</label>
                <select id="dairy-company" name="dairy-company" class="form-select">
                    <option value="fonterra">Fonterra</option>
                    <option value="dairy-goat-coop">Dairy Goat Co-op</option>
                    <option value="green-valley">Green Valley Dairies</option>
                    <option value="maui-milk">Maui Milk</option>
                    <option value="oceania">Oceania</option>
                    <option value="ofi">OFI</option>
                    <option value="synlait">Synlait Milk LTD</option>
                    <option value="tatua">Tatua</option>
                </select>
                <label for="address">Address:</label>
                <input type="text" class="form-control" id="address" name="address">
                <label for="customer-name">Customer Name:</label>
                <input type="text" class="form-control" id="customer-name" name="customer-name">
                <label for="region">Region:</label>
                <select id="region" name="region" class="form-select">
                    <option value="northland">Northland</option>
                    <option value="auckland">Auckland</option>
                    <option value="waikato">Waikato</option>
                    <option value="bay-of-plenty">Bay of Plenty</option>
                    <option value="gisborne">Gisborne</option>
                    <option value="hawkes-bay">Hawke's Bay</option>
                    <option value="taranaki">Taranaki</option>
                    <option value="manawatu-wanganui">Manawatu-Wanganui</option>
                    <option value="wellington">Wellington</option>
                    <option value="nelson">Nelson</option>
                    <option value="marlborough">Marlborough</option>
                    <option value="west-coast">West Coast</option>
                    <option value="canterbury">Canterbury</option>
                    <option value="otago">Otago</option>
                    <option value="southland">Southland</option>
                </select>
                <label for="farm-name">Farm Name:</label>
                <input type="text" class="form-control" id="farm-name" name="farm-name">
                <label for="island">Island:</label>
                <select id="island" name="island" class="form-select">
                    <option value="north-island">North Island</option>
                    <option value="south-island">South Island</option>
                </select>
                <label for="visit-date">Visit Date:</label>
                <input type="date" class="form-control" id="visit-date" name="visit-date">
                <label for="visit-type">Visit Type:</label>
                <input type="text" class="form-control" id="visit-type" name="visit-type" value="Milking Plant & Milk Vat Check" readonly>
                <label for="inspection-start-time">Inspection Start Time:</label>
                <input type="time" class="form-control" id="inspection-start-time" name="inspection-start-time">
                <label for="inspection-end-time">Inspection End Time:</label>
                <input type="time" class="form-control" id="inspection-end-time" name="inspection-end-time">
                <label for="inspection-completed-by">Inspection Completed By:</label>
                <input type="text" class="form-control" id="inspection-completed-by" name="inspection-completed-by">
                <label for="call-type">Call Type:</label>
                <select id="call-type" name="call-type" class="form-select">
                    <option value="alert">Alert</option>
                    <option value="grade-call">Grade Call</option>
                    <option value="regular-scheduled-visit" selected>Regular Scheduled Visit</option>
                </select>
            </div>

            <!-- Checklist Items Section -->
            <div class="section mb-4">
                <h2>Checklist Items</h2>
                <div id="checklist-items">
                    <!-- Checklist items will be dynamically added here -->
                </div>
            </div>

            <!-- Temperature Measurements Section -->
            <div class="section mb-4">
                <h2>Temperature Measurements</h2>
                <div class="checklist-item">
                    <label for="hot-water-temp">Hot Water Temp (°C):</label>
                    <input type="number" class="form-control" id="hot-water-temp" name="hot-water-temp" step="0.1">
                    <label for="hot-water-time">Time Taken:</label>
                    <input type="time" class="form-control" id="hot-water-time" name="hot-water-time">
                </div>
                <div class="checklist-item">
                    <label for="milk-temp">Milk Temp (°C):</label>
                    <input type="number" class="form-control" id="milk-temp" name="milk-temp" step="0.1">
                    <label for="milk-time">Time Taken:</label>
                    <input type="time" class="form-control" id="milk-time" name="milk-time">
                </div>
            </div>

            <button type="button" onclick="generatePDF()">Generate PDF</button>
            <button type="button" onclick="viewRecords()">View All Records</button>
        </form>
        <div class="version">Version 5.1</div>
    </div>

    <!-- Records Viewing Page -->
    <div id="record-container" class="record-container" style="display: none;">
        <h2>All Dairy Shed Hygiene Records</h2>
        <div class="search-container">
            <input type="text" id="search-dairy-number" class="form-control" placeholder="Search by Dairy Number" oninput="filterRecords()">
        </div>
        <div id="record-list" class="record-list"></div>
        <button class="back-button" onclick="goBack()">Back to Checklist</button>
    </div>

    <script>
        // Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyDr9nA44Kkej*****GUzbMDECI8cTFI",
            authDomain: "dairy-farm-record-system.firebaseapp.com",
            projectId: "dairy-farm-record-system",
            storageBucket: "dairy-farm-record-system.appspot.com",
            messagingSenderId: "422124188212",
            appId: "1:422124188212:web:1bd31bee8d6e91e301d061"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const storage = firebase.storage();
        const firestore = firebase.firestore();

        async function fetchFarmDetails() {
            const dairyNumber = document.getElementById('dairy-number').value;
            if (dairyNumber) {
                const storageRef = storage.ref(`farm_details/${dairyNumber}.json`);
                try {
                    const url = await storageRef.getDownloadURL();
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error('Failed to fetch the farm details');
                    }
                    const data = await response.json();
                    if (data) {
                        document.getElementById('dairy-company').value = data.dairyCompany || '';
                        document.getElementById('address').value = data.address || '';
                        document.getElementById('customer-name').value = data.customerName || '';
                        document.getElementById('region').value = data.region || '';
                        document.getElementById('farm-name').value = data.farmName || '';
                        document.getElementById('island').value = data.island || '';
                    }
                } catch (error) {
                    console.error('Error fetching farm details:', error);
                }
            }
        }

        // Functionality to create a new farm details record if not found
        async function saveFarmDetails(formData) {
            const dairyNumber = formData.get('dairy-number');
            const farmDetails = {
                dairyCompany: formData.get('dairy-company'),
                address: formData.get('address'),
                customerName: formData.get('customer-name'),
                region: formData.get('region'),
                farmName: formData.get('farm-name'),
                island: formData.get('island'),
            };
            const storageRef = storage.ref(`farm_details/${dairyNumber}.json`);
            const metadata = {
                contentType: 'application/json',
            };
            try {
                await storageRef.put(new Blob([JSON.stringify(farmDetails)], { type: 'application/json' }), metadata);
                console.log('Farm details saved successfully.');
            } catch (error) {
                console.error('Error saving farm details:', error);
            }
        }

        async function generatePDF() {
            const form = document.getElementById('hygiene-checklist-form');
            const formData = new FormData(form);
            const dairyNumber = formData.get('dairy-number');

            await saveFarmDetails(formData); // Save farm details if not found

            const { jsPDF } = window.jspdf;
            let pdf = new jsPDF('p', 'pt', 'a4');

            // Add logo centered
            const logoUrl = "https://i.postimg.cc/htZPjx5g/logo-89.png";
            const logo = await fetch(logoUrl).then((res) => res.blob());
            const reader = new FileReader();
            reader.readAsDataURL(logo);
            reader.onload = function () {
                const imgData = reader.result;
                pdf.addImage(imgData, 'PNG', 180, 40, 240, 60);

                pdf.setFontSize(12);
                pdf.setTextColor('#000000');
                pdf.setFont('helvetica', 'bold');
                pdf.text('Farm Details:', 40, 130);

                pdf.setFont('helvetica', 'normal');
                pdf.text(`Dairy Company: ${formData.get('dairy-company')}`, 40, 150);
                pdf.text(`Dairy Number: ${formData.get('dairy-number')}`, 40, 165);
                pdf.text(`Address: ${formData.get('address')}`, 40, 180);
                pdf.text(`Customer Name: ${formData.get('customer-name')}`, 40, 195);
                pdf.text(`Region: ${formData.get('region')}`, 40, 210);
                pdf.text(`Farm Name: ${formData.get('farm-name')}`, 40, 225);
                pdf.text(`Island: ${formData.get('island')}`, 40, 240);
                pdf.text(`Visit Date: ${formData.get('visit-date')}`, 40, 255);
                pdf.text(`Visit Type: ${formData.get('visit-type')}`, 40, 270);
                pdf.text(`Inspection Start Time: ${formData.get('inspection-start-time')}`, 40, 285);
                pdf.text(`Inspection End Time: ${formData.get('inspection-end-time')}`, 40, 300);
                pdf.text(`Inspection Completed By: ${formData.get('inspection-completed-by')}`, 40, 315);
                pdf.text(`Call Type: ${formData.get('call-type')}`, 40, 330);

                // Checklist Items Section
                const checklistItemsDiv = document.getElementById('checklist-items').children;
                const checklistTable = [];
                const photos = [];

                for (let item of checklistItemsDiv) {
                    const itemName = item.querySelector('label').textContent;
                    const status = item.querySelector('select').value;
                    let comments = item.querySelector('input[type="text"]').value;
                    const imageFile = item.querySelector('input[type="file"]').files[0];

                    if (status === 'attention-required') {
                        comments += " (See attached photo below)";
                    }

                    checklistTable.push([itemName, status, comments]);

                    if (imageFile) {
                        const imgReader = new FileReader();
                        imgReader.onload = function (event) {
                            photos.push({
                                imageData: event.target.result,
                                title: itemName
                            });
                        };
                        imgReader.readAsDataURL(imageFile);
                    }
                }

                // Generate checklist items table
                pdf.autoTable({
                    startY: 350,
                    head: [['Item', 'Status', 'Comments']],
                    body: checklistTable,
                    styles: {
                        fontSize: 10,
                        cellPadding: 5,
                    },
                    headStyles: {
                        fillColor: '#002B5C',
                        textColor: '#FFFFFF'
                    }
                });

                // Add temperature data
                let currentY = pdf.lastAutoTable.finalY + 20;

                pdf.setFont('helvetica', 'bold');
                pdf.text('Temperature Measurements:', 40, currentY);
                currentY += 20;

                pdf.setFont('helvetica', 'normal');
                pdf.text(`Hot Water Temp: ${formData.get('hot-water-temp')} °C`, 40, currentY);
                currentY += 15;
                pdf.text(`Time Taken: ${formData.get('hot-water-time')}`, 40, currentY);
                currentY += 20;

                pdf.text(`Milk Temp: ${formData.get('milk-temp')} °C`, 40, currentY);
                currentY += 15;
                pdf.text(`Time Taken: ${formData.get('milk-time')}`, 40, currentY);
                currentY += 20;

                // Add photos after the checklist
                setTimeout(() => {
                    let photoY = pdf.lastAutoTable.finalY + 120; // Start placing photos after the last auto table

                    photos.forEach((photo, index) => {
                        if (photoY > 700) {
                            // If we're getting close to the end of the page, add a new page
                            pdf.addPage();
                            photoY = 60; // Reset Y position for the new page
                        }

                        pdf.addImage(photo.imageData, 'JPEG', 40, photoY, 250, 200); // Adjust the size to fit more photos
                        pdf.setFontSize(12);
                        pdf.text(photo.title, 40, photoY - 10); // Add the title above the photo
                        photoY += 220; // Move Y position down for the next photo (image height + spacing)
                    });

                    // Save PDF and upload to Firebase
                    const pdfBlob = pdf.output('blob');
                    const timestamp = new Date().toISOString().split('T')[0];
                    const fileName = `${dairyNumber}-form-${timestamp}.pdf`;
                    const storageRef = storage.ref(`customers/${dairyNumber}/${fileName}`);

                    storageRef.put(pdfBlob).then(() => {
                        console.log('PDF uploaded successfully');
                    }).catch((error) => {
                        console.error('Error uploading PDF:', error);
                    });

                    pdf.save('Dairy_Shed_Hygiene_Checklist.pdf');
                }, 1000);
            };
        }

        document.addEventListener("DOMContentLoaded", () => {
            createChecklistItems();
        });

        function createChecklistItems() {
            const checklistItems = [
                "Pulsator Airline", "Long Bend Elbows", "Automatic Cup and Remover", "Diaphragm", "Receiving Can",
                "Sanitary Trap", "Main Milk Line", "Milk Line Seals in Good Condition", "Stainless Droppers", "Long Milk Rubber",
                "Liner", "Cluster", "Cluster Seal", "Cluster Button", "Non Return Valve at Milk Pump", "Milk Pump",
                "Filter Housing", "Plate Cooler", "Interceptor", "Receiver Airline", "Flushing Pulsator", "Air Purge Valve",
                "Vacuum Level", "Main Airline", "Plant Drainage - Milk Pump", "Plant Drainage - Filter/s", "Plant Drainage - Plate Cooler",
                "Plant Drainage - Vat Entry", "Plant Wash Tap", "Wash Jetters", "Centre Gland", "Test Bucket", "Inlet Valve",
                "Non-Return Valve", "Spray Ball", "Agitator", "Silo Door", "Manhole Seal", "Vat Outlet", "Walls in Silo"
            ];

            const checklistContainer = document.getElementById('checklist-items');
            checklistContainer.innerHTML = '';

            checklistItems.forEach(item => {
                const itemContainer = document.createElement('div');
                itemContainer.classList.add('checklist-item');

                const label = document.createElement('label');
                label.textContent = item;
                itemContainer.appendChild(label);

                const statusSelect = document.createElement('select');
                statusSelect.classList.add('form-select');
                statusSelect.innerHTML = `
                    <option value="ok">OK</option>
                    <option value="attention-required">Attention Required</option>
                    <option value="na">N/A</option>
                    <option value="not-checked">Not Checked</option>
                `;
                itemContainer.appendChild(statusSelect);

                const commentsInput = document.createElement('input');
                commentsInput.type = 'text';
                commentsInput.classList.add('form-control');
                commentsInput.placeholder = 'Comments';
                itemContainer.appendChild(commentsInput);

                const imageUpload = document.createElement('input');
                imageUpload.type = 'file';
                imageUpload.classList.add('form-control', 'image-upload');
                imageUpload.style.display = 'none';
                itemContainer.appendChild(imageUpload);

                statusSelect.addEventListener('change', () => {
                    if (statusSelect.value === 'attention-required') {
                        imageUpload.style.display = 'block';
                    } else {
                        imageUpload.style.display = 'none';
                    }

                    if (statusSelect.value === 'not-checked') {
                        commentsInput.value = "Milk in Vat";
                    } else {
                        if (commentsInput.value === "Milk in Vat") {
                            commentsInput.value = ""; // Clear the field if it was auto-filled by 'Not Checked'
                        }
                    }
                });

                checklistContainer.appendChild(itemContainer);
            });
        }

        function viewRecords() {
            document.getElementById('form-container').style.display = 'none';
            document.getElementById('record-container').style.display = 'block';
            loadAllRecords();
        }

        async function loadAllRecords() {
            const recordList = document.getElementById('record-list');
            recordList.innerHTML = '';
            const storageRef = storage.ref('customers');

            try {
                const folderSnapshot = await storageRef.listAll();
                folderSnapshot.prefixes.forEach(folderRef => {
                    const dairyNumber = folderRef.name;
                    const folderLink = document.createElement('a');
                    folderLink.textContent = dairyNumber;
                    folderLink.href = '#';
                    folderLink.addEventListener('click', () => {
                        loadRecordFiles(dairyNumber);
                    });
                    recordList.appendChild(folderLink);
                });
            } catch (error) {
                console.error('Error fetching records:', error);
            }
        }

        async function loadRecordFiles(dairyNumber) {
            const recordList = document.getElementById('record-list');
            recordList.innerHTML = '';
            const storageRef = storage.ref(`customers/${dairyNumber}`);

            try {
                const fileSnapshot = await storageRef.listAll();
                fileSnapshot.items.forEach(fileRef => {
                    const fileName = fileRef.name;
                    const dateOnly = fileName.match(/(\d{4}-\d{2}-\d{2})/);
                    const displayName = dateOnly ? dateOnly[0] : fileName;

                    const fileLink = document.createElement('a');
                    fileLink.textContent = displayName;
                    fileLink.href = '#';
                    fileLink.addEventListener('click', async () => {
                        try {
                            const url = await fileRef.getDownloadURL();
                            window.open(url, '_blank');
                        } catch (error) {
                            console.error('Error fetching file:', error);
                        }
                    });
                    recordList.appendChild(fileLink);
                });

                const backButton = document.createElement('button');
                backButton.textContent = 'Back to Records';
                backButton.className = 'back-button';
                backButton.addEventListener('click', goBackToRecords);
                recordList.appendChild(backButton);
            } catch (error) {
                console.error('Error fetching record files:', error);
            }
        }

        function goBack() {
            document.getElementById('form-container').style.display = 'block';
            document.getElementById('record-container').style.display = 'none';
        }

        function goBackToRecords() {
            loadAllRecords();
        }
    </script>
</body>

</html>
