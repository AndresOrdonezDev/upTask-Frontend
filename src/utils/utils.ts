
export function formateDate(isoString: string): string {
    const date = new Date(isoString);

    // Parte de la fecha (día de mes de año)
    const dateFormatter = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });

    // Parte de la hora (formato de 12 horas)
    const timeFormatter = new Intl.DateTimeFormat('es-ES', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    const formattedDate = dateFormatter.format(date); // ej: 11 de abril de 2025
    let formattedTime = timeFormatter.format(date);   // ej: 8:59 p. m.

    // Normalizar "p. m." → "pm" y "a. m." → "am"
    formattedTime = formattedTime.replace(/\s*p\.?\s*m\.?/i, ' pm').replace(/\s*a\.?\s*m\.?/i, ' am');

    return `${formattedDate} a las ${formattedTime}`;
}