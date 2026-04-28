import { RootState } from '../../../../app/store';

export const selectGoalEditModal = (state: RootState) => state.GoalEditModal;
export const selectGoalEditModalVisible = (state: RootState) => state.GoalEditModal.isVisible;
export const selectGoalEditModalTitle = (state: RootState) => state.GoalEditModal.title;
export const selectGoalEditModalDescription = (state: RootState) => state.GoalEditModal.description;
export const selectGoalEditModalCategory = (state: RootState) => state.GoalEditModal.category;
export const selectGoalEditModalDeadline = (state: RootState) => state.GoalEditModal.deadline;
export const selectGoalEditModalStartDate = (state: RootState) => state.GoalEditModal.startDate;
export const selectGoalEditModalStatus = (state: RootState) => state.GoalEditModal.status;
export const selectGoalEditModalPriority = (state: RootState) => state.GoalEditModal.priority;
export const selectGoalEditModalResults = (state: RootState) => state.GoalEditModal.results;
export const selectGoalEditModalCurrentGoalId = (state: RootState) => state.GoalEditModal.currentGoalId;
export const selectGoalEditModalOriginalGoal = (state: RootState) => state.GoalEditModal.originalGoal;
export const selectGoalEditModalIsSaving = (state: RootState) => state.GoalEditModal.isSaving;
export const selectGoalEditModalError = (state: RootState) => state.GoalEditModal.error;
export const selectGoalEditModalResultModalVisible = (state: RootState) => state.GoalEditModal.resultModalVisible;
export const selectGoalEditModalResultText = (state: RootState) => state.GoalEditModal.resultText;