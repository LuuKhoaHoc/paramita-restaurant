export const checkPromotion = (start_date, end_date) => {
  const now = new Date()
  if (now > new Date(start_date) && now < new Date(end_date)) {
    return 'Đang diễn ra'
  } else if (now < new Date(start_date)) {
    return 'Chưa diễn ra'
  } else {
    return 'Đã kết thúc'
  }
}
