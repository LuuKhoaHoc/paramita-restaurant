export const quarterOptions = [
  { value: '1', label: 'Quý 1' },
  { value: '2', label: 'Quý 2' },
  { value: '3', label: 'Quý 3' },
  { value: '4', label: 'Quý 4' }
]

export const monthOptions = [
  { value: '1', label: 'Tháng 1' },
  { value: '2', label: 'Tháng 2' },
  { value: '3', label: 'Tháng 3' },
  { value: '4', label: 'Tháng 4' },
  { value: '5', label: 'Tháng 5' },
  { value: '6', label: 'Tháng 6' },
  { value: '7', label: 'Tháng 7' },
  { value: '8', label: 'Tháng 8' },
  { value: '9', label: 'Tháng 9' },
  { value: '10', label: 'Tháng 10' },
  { value: '11', label: 'Tháng 11' },
  { value: '12', label: 'Tháng 12' }
]

export const yearOptions = [
  { value: '2021', element: '2021' },
  { value: '2022', element: '2022' },
  { value: '2023', element: '2023' },
  { value: '2024', element: '2024' },
  { value: '2025', element: '2025' },
  { value: '2026', element: '2026' }
]
function daysInYear(year) {
  return (year % 4 === 0 && year % 100 > 0) || year % 400 == 0 ? 366 : 365
}
const WeekInYear = Math.floor(daysInYear(new Date().getFullYear()) / 7)

function getStartDateOfWeek(week) {
  let oneJan = new Date(new Date().getFullYear(), 0, 1)
  let date = new Date(oneJan.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000)
  return `${date.getDate()} - ${date.getMonth() + 1}`
}
export const weekOptions = Array.from({ length: WeekInYear }, (_, i) => {
  return {
    value: i + 1,
    label: `Tuần ${i + 1} từ ${getStartDateOfWeek(
      i + 1
    )} đến ${getStartDateOfWeek(i + 1.9)}`
  }
})
