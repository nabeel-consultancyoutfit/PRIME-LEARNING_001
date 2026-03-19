import type { NextPage, GetServerSideProps } from 'next';
import ReportDetail from '@/modules/trainer/pages/Reports/ReportDetail';

interface Props { slug: string; }

const ReportPage: NextPage<Props> = ({ slug }) => <ReportDetail slug={slug} />;

export const getServerSideProps: GetServerSideProps = async ({ params }) => ({
  props: { slug: (params?.report as string) ?? '' },
});

export default ReportPage;
