export default function converterData(data: string): Date {
    const [dia, mes, ano] = data.split('/').map(Number);
    // Note que o mês em JavaScript é 0-based, então subtrai 1
    return new Date(ano, mes - 1, dia);
}