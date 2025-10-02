/**
  * Returns the elapsed time from a timestamp
  * @param value time - the number of remaining or elapsed time in milliseconds
  * @param resolution - the minimum time resolution [day, hour, minute (default)]
  * @param precision - the number of time chunks to print (default: Infinity)
  * @param format - the time format [short (default), long]
  */
const formatElapsedTime = (time: number, resolution: any = null, precision: any = null, format: string | null = null): number => {
	let out:any = '';

	let remaining:number = time;

	const day:number = 24 * 60 * 60 * 1000;
	const hour:number = 60 * 60 * 1000;
	const minute:number = 60 * 1000;

	const resolutions: any = ['day', 'hour', 'minute'];

	precision = precision ? precision : Infinity;
	resolution = resolution ? resolution : 'minute';
	resolution = resolutions.indexOf(resolution) + 1;
	format = format ? format : 'short';

	if (time > day && precision && resolution) {
		const days:any = Math.floor(remaining / day);
		out += days;
		if (format === 'short') {
			// TODO: Translation here
			out += ' ' + 'd' + ' ';
		}
		else if (format === 'long') {
			// TODO: Translation here
			out += days > 1 ? ' ' + 'days' + ' ' : ' ' + 'day' + ' ';
		}
		remaining = remaining - days * day;
		precision--;
		resolution--;
	}
	if (time > hour && precision && resolution) {
		const hours:any = Math.floor(remaining / hour);
		out += hours;
		if (format === 'short') {
			// TODO: Translation here
			out += ' ' + 'h' + ' ';
		}
		else if (format === 'long') {
			// TODO: Translation here
			out += hours > 1 ? ' ' + 'hours' + ' ' : ' ' + 'h' + ' ';
		}
		remaining = remaining - hours * hour;
		precision--;
		resolution--;
	}
	if (precision && resolution) {
		if (time > minute) {
			const minutes:any = Math.round(remaining / minute);
			out += minutes;
			if (format === 'short') {
				// TODO: Translation here
				out += ' ' + 'min' + ' ';
			}
			else if (format === 'long') {
				if (minutes > 1) {
					// TODO: Translation here
					out += ' ' + 'minute' + ' ';
				}
				else {
					// TODO: Translation here
					out += ' ' + 'minute' + ' ';
				}
			}
		}
		else if (time > 1000) {
			if (format === 'short') {
				// TODO: Translation here
				out = '< 1' + ' ' + 'min';
			}
			else if (format === 'long') {
				// TODO: Translation here
				out = '< 1' + ' ' + 'minute';
			}
		}
		else {
			out = '';
		}
	}

	return out.trim();
};

/**
  * Returns the initials of a name in Upper Case, e.g: 'John Romero' returns 'JR'
  * 
  * @param {string} name - The full name.
  * @returns {string|false} The initials of the name in uppercase, or false if the name is empty.
  */
const getNameInitials = (name: string):string | false => {
	if(!name) return false;
	return name.split(' ').reduce((previous, current) => {
		return `${previous}${current[0]}`;
	}, '').toUpperCase();
};

export {
	formatElapsedTime,
	getNameInitials
};