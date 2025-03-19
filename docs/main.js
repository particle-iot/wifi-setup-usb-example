


$(document).ready(function() {
	// Also works with Photon 2, which shows up as a P2.
	const allowedDeviceTypes = ['p2', 'argon', "m-som"];
	
	let usbDevice;

	const setStatus = function(s) {
		$('#statusDiv').text(s);
	}

	if (!navigator.usb) {
		$('#unsupportedBrowserDiv').show();
		return;
	}
	$('#mainDiv').show();

	$('#selectDevice').on('click', async function() {
		$('#selectDevice').prop('disabled', true);
		try {
			// TODO: Restrict to P2 and Argon
			const filters = [
				{vendorId: 0x2b04, productId: 0xc00c}, // 0x0C = 12 = Argon
				{vendorId: 0x2b04, productId: 0xc020}, // 0x20 = 32 = P2 and Photon 2
				{vendorId: 0x2b04, productId: 0xc023}, // 0x23 = 35 = M-SoM
			];

			const nativeUsbDevice = await navigator.usb.requestDevice({ filters: filters })

			setStatus('Connecting to device...');

            usbDevice = await ParticleUsb.openNativeUsbDevice(nativeUsbDevice, {});
		
			setStatus('Getting Wi-Fi networks...');
			const networks = await usbDevice.scanWifiNetworks();

			//console.log('networks', networks);

			let showSSIDs = [];
			for(const network of networks) {
				if (network.ssid && !showSSIDs.includes(network.ssid)) {
					showSSIDs.push(network.ssid);
				}
			}

			$('#ssidSelect').empty();

			if (showSSIDs.length) {
				setStatus('Select a Wi-Fi network: ');

				for(const ssid of showSSIDs) {
					const optionElem = document.createElement('option');
					$(optionElem).attr('value', ssid);
					$(optionElem).text(ssid);
					$('#ssidSelect').append(optionElem);
				}
				$('#selectNetworkDiv').show();
	
				$('#configureButton').prop('disabled', false);
			}
			else {
				setStatus('No available Wi-Fi networks');
				$('#configureButton').prop('disabled', true);
			}

		}
		catch(e) {
			if (e.toString().indexOf('No device selected') < 0) {
				console.log('uncaught exception in selectDevice', e);
				setStatus('Unexpected error in device setup');	
			}
			$('#selectDevice').prop('disabled', false);
		}
	});

	$('#passwordInput').on('keydown', function(ev) {
		if (ev.key != 'Enter') {
			return;
		}

		ev.preventDefault();
		$('#configureButton').trigger('click');    
	});

	$('#configureButton').on('click', async function() {
		$('#configureButton').prop('disabled', true);

		const ssid = $('#ssidSelect').val();
		let password = $('#passwordInput').val();
		if (password.length == 0) {
			password = null; // Unencrypted Wi-Fi
		}
		setStatus('Configuring Wi-Fi network (this may take a minute)...');

		try {
			await usbDevice.joinNewWifiNetwork({ ssid, password });

			$('#selectNetworkDiv').hide();
			$('#selectDevice').prop('disabled', false);
			setStatus('Setup done!');
		}
		catch(e) {
			console.log('uncaught exception in configureButton', e);
			setStatus('Unexpected error in configuring Wi-Fi');	
		}

		$('#configureButton').prop('disabled', false);
	});

});

