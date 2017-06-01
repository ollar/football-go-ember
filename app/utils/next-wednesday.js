export default function() {
  const todayDay = new Date().getDay();
  const today = new Date();

  const dayDelta = () => {
    if (todayDay < 4) return 3 - todayDay;
    return 10 - todayDay;
  };

  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayDelta());
}
