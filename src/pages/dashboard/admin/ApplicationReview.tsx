// import { useState, useEffect } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { supabase } from '@/integrations/supabase/client';
// import { Tables } from '@/integrations/supabase/types';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import {
//   AlertCircle,
//   CheckCircle2,
//   Clock,
//   XCircle,
//   Search,
//   RefreshCw,
// } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
// import { useToast } from '@/components/ui/use-toast';
// import ApplicationDetailDialog from './ApplicationDetailDialog';

// const statusIcons = {
//   pending: <Clock className="h-4 w-4 text-yellow-500" />,
//   approved: <CheckCircle2 className="h-4 w-4 text-green-500" />,
//   rejected: <XCircle className="h-4 w-4 text-red-500" />,
//   needs_revision: <AlertCircle className="h-4 w-4 text-orange-500" />,
// };

// const statusBadgeVariant = {
//   pending: 'secondary',
//   approved: 'success',
//   rejected: 'destructive',
//   needs_revision: 'warning',
// };

// export default function ApplicationReview() {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();
//   const [selectedApplication, setSelectedApplication] = useState<Tables<'provider_applications'> | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState<string>('all');
//   const [typeFilter, setTypeFilter] = useState<string>('all');

//   // Fetch applications
//   const { data: applications, isLoading, isError, refetch } = useQuery({
//     queryKey: ['provider_applications'],
//     queryFn: async () => {
//       let query = supabase
//         .from('provider_applications')
//         .select('*')
//         .order('submitted_at', { ascending: false });

//       if (statusFilter !== 'all') {
//         query = query.eq('status', statusFilter);
//       }

//       if (typeFilter !== 'all') {
//         query = query.eq('provider_type', typeFilter);
//       }

//       if (searchTerm) {
//         query = query.or(
//           `organization_name.ilike.%${searchTerm}%,contact_person.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`
//         );
//       }

//       const { data, error } = await query;

//       if (error) throw error;
//       return data as Tables<'provider_applications'>[];
//     },
//   });

//   // Update application status mutation
//   const { mutate: updateStatus } = useMutation({
//     mutationFn: async ({
//       id,
//       status,
//       feedback,
//     }: {
//       id: string;
//       status: Tables<'provider_applications'>['status'];
//       feedback?: string;
//     }) => {
//       const { data, error } = await supabase
//         .from('provider_applications')
//         .update({
//           status,
//           rejection_reason: feedback,
//           reviewed_at: new Date().toISOString(),
//           reviewer_id: (await supabase.auth.getUser()).data.user?.id,
//         })
//         .eq('id', id)
//         .select()
//         .single();

//       if (error) throw error;
//       return data;
//     },
//     onSuccess: (data) => {
//       queryClient.invalidateQueries(['provider_applications']);
//       toast({
//         title: 'Application updated',
//         description: `Application status changed to ${data.status}`,
//       });
//       setSelectedApplication(null);
//     },
//     onError: (error) => {
//       toast({
//         title: 'Error',
//         description: 'Failed to update application',
//         variant: 'destructive',
//       });
//     },
//   });

//   if (isError) {
//     return (
//       <div className="flex flex-col items-center justify-center h-64">
//         <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
//         <p className="text-lg font-medium">Failed to load applications</p>
//         <Button variant="outline" onClick={() => refetch()} className="mt-4">
//           <RefreshCw className="mr-2 h-4 w-4" />
//           Retry
//         </Button>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <RefreshCw className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//         <h2 className="text-2xl font-bold">Provider Applications</h2>
//         <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
//           <div className="relative w-full sm:w-64">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <Input
//               placeholder="Search applications..."
//               className="pl-9"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="w-full sm:w-40">
//               <SelectValue placeholder="Filter by status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Statuses</SelectItem>
//               <SelectItem value="pending">Pending</SelectItem>
//               <SelectItem value="approved">Approved</SelectItem>
//               <SelectItem value="rejected">Rejected</SelectItem>
//               <SelectItem value="needs_revision">Needs Revision</SelectItem>
//             </SelectContent>
//           </Select>
//           <Select value={typeFilter} onValueChange={setTypeFilter}>
//             <SelectTrigger className="w-full sm:w-40">
//               <SelectValue placeholder="Filter by type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Types</SelectItem>
//               <SelectItem value="doctor">Doctor</SelectItem>
//               <SelectItem value="pharmacy">Pharmacy</SelectItem>
//               <SelectItem value="diagnostic">Diagnostic</SelectItem>
//               <SelectItem value="ambulance">Ambulance</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Provider</TableHead>
//               <TableHead>Contact</TableHead>
//               <TableHead>Type</TableHead>
//               <TableHead>Submitted</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {applications?.length ? (
//               applications.map((application) => (
//                 <TableRow key={application.id}>
//                   <TableCell className="font-medium">
//                     {application.organization_name || application.contact_person}
//                   </TableCell>
//                   <TableCell>
//                     <div className="text-sm text-gray-500">
//                       {application.email}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {application.phone}
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <Badge variant="outline" className="capitalize">
//                       {application.provider_type}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     {new Date(application.submitted_at).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell>
//                     <Badge variant={statusBadgeVariant[application.status]}>
//                       <div className="flex items-center gap-1">
//                         {statusIcons[application.status]}
//                         {application.status.replace('_', ' ')}
//                       </div>
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => setSelectedApplication(application)}
//                     >
//                       Review
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={6} className="h-24 text-center">
//                   No applications found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {selectedApplication && (
//         <ApplicationDetailDialog
//           application={selectedApplication}
//           onClose={() => setSelectedApplication(null)}
//           onStatusUpdate={updateStatus}
//         />
//       )}
//     </div>
//   );
// }