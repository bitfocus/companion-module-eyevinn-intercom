import { SomeCompanionConfigField } from '@companion-module/base'

export interface ModuleConfig {
	port: string
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'textinput',
			id: 'port',
			label: 'WebSocket Port',
			default: '12345',
			regex: '/^\\d+$/',
			width: 6,
		},
	]
}
