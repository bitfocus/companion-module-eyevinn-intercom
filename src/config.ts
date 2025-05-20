import { SomeCompanionConfigField } from '@companion-module/base'

export interface ModuleConfig {
	port: string
	host: string
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'textinput',
			id: 'host',
			label: 'WebSocket Bind Interface',
			default: '0.0.0.0',
			width: 12,
		},
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
