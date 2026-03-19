import type { NextPage, GetServerSideProps } from 'next';
import TaskDetail from '@/modules/learner/pages/Tasks/TaskDetail';

interface Props { taskId: string; }

const TaskDetailPage: NextPage<Props> = ({ taskId }) => <TaskDetail taskId={taskId} />;

export const getServerSideProps: GetServerSideProps = async ({ params }) => ({
  props: { taskId: (params?.taskId as string) ?? '' },
});

export default TaskDetailPage;
