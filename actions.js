export function getActions() {
	this.chCount = 64
	this.sceneCount = 500

	let actions = {}

	this.listOptions = (name, qty, offset) => {
		this.CHOICES = []
		for (let i = 1; i <= qty; i++) {
			this.CHOICES.push({ label: `${name} ${i}`, id: i + offset })
		}
		return [
			{
				type: 'dropdown',
				label: name,
				id: 'number',
				default: 0,
				choices: this.CHOICES,
				minChoicesForSearch: 0,
			},
		]
	}

	this.muteOptions = (name, qty, offset) => {
		this.CHOICES = []
		for (let i = 1; i <= qty; i++) {
			this.CHOICES.push({ label: `${name} ${i}`, id: i + offset })
		}
		return [
			{
				type: 'dropdown',
				label: name,
				id: 'inputChannel',
				default: 0,
				choices: this.CHOICES,
				minChoicesForSearch: 0,
			},
			{
				type: 'checkbox',
				label: 'Mute',
				id: 'mute',
				default: true,
			},
		]
	}

	actions['mute_input'] = {
		name: 'Mute Input',
		options: this.muteOptions('Mute input', 64, -1),
		callback: (action) => {
			let channel = parseInt(action.options.inputChannel)

			let buffers = [Buffer.from([0x90, channel, action.options.mute ? 0x7f : 0x3f, 0x90, channel, 0])]

			this.sendCommand(buffers)
			this.inputsMute[channel] = action.options.mute ? 1 : 0
		},
	}

	actions['mute_zone'] = {
		name: 'Mute Zone',
		options: this.muteOptions('Mute zone', 64, -1),
		callback: (action) => {
			let channel = parseInt(action.options.inputChannel)

			let buffers = [Buffer.from([0x91, channel, action.options.mute ? 0x7f : 0x3f, 0x91, channel, 0])]
			this.sendCommand(buffers)
			this.zonesMute[channel] = action.options.mute ? 1 : 0
			this.checkFeedbacks('zoneMute')
		},
	}

	actions['scene_recall'] = {
		name: 'Recall Preset',
		options: this.listOptions('Recall Preset', 500, -1),
		callback: (action) => {
			let presetNumber = parseInt(action.options.number)
			let buffers = [
				Buffer.from([
					0xb0,
					0x00,
					presetNumber < 128 ? 0x00 : presetNumber < 256 ? 0x01 : presetNumber < 384 ? 0x02 : 0x03,
					0xc0,
					presetNumber,
				]),
			]
			this.sendCommand(buffers)
		},
	}

	actions['input_to_zone'] = {
		name: 'Mute input to zone',
		options: this.muteOptions('Mute Channel', 64, -1).concat(this.listOptions('zone', 64, -1)),
		callback: (action) => {
			let channel = parseInt(action.options.inputChannel)
			let zoneNumber = parseInt(action.options.number)

			let buffers = [
				Buffer.from([
					0xf0,
					0x00,
					0x00,
					0x1a,
					0x50,
					0x12,
					0x01,
					0x00,
					0x00,
					0x03,
					channel,
					0x01,
					zoneNumber,
					action.options.mute ? 0x7f : 0x3f,
					0xf7,
				]),
			]
			this.sendCommand(buffers)
			if (this.inputsToZonesMute[channel + 1]?.[zoneNumber + 1]) {
				this.inputsToZonesMute[channel + 1][zoneNumber + 1] = action.options.mute ? 1 : 0
			} else {
				this.inputsToZonesMute[channel + 1] = {}
				this.inputsToZonesMute[channel + 1][zoneNumber + 1] = action.options.mute ? 1 : 0
			}

			this.checkFeedbacks('inputToZoneMute')
		},
	}

	// actions['get_phantom'] = {
	// 	name: 'Get phantom info',
	// 	options: this.listOptions('Input', 64, -1),
	//callback: (action) => {}
	// }

	return actions
}
