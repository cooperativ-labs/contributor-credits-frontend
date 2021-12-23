import { ProjectUserTimeCommitment } from 'types';

function useTotalMemberHours(timeInvestment: ProjectUserTimeCommitment) {
  const dayTimes = timeInvestment.byDay;
  if (dayTimes) {
    let totalWeeklyHours = 0;
    for (const day in dayTimes) {
      if (typeof dayTimes[day] === 'number') totalWeeklyHours += dayTimes[day];
    }
    return totalWeeklyHours;
  }
  return timeInvestment.total;
}

export default useTotalMemberHours;
