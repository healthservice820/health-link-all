// import { useState } from 'react';
// import { Tables } from '@/integrations/supabase/types'
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import {
//   AlertCircle,
//   CheckCircle2,
//   Clock,
//   FileText,
//   Mail,
//   Phone,
//   User,
//   XCircle,
// } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
// import { format } from 'date-fns';

// type Props = {
//   application: Tables<'provider_applications'>;
//   onClose: () => void;
//   onStatusUpdate: (params: {
//     id: string;
//     status: Tables<'provider_applications'>['status'];
//     feedback?: string;
//   }) => void;
// };

// export default function ApplicationDetailDialog({
//   application,
//   onClose,
//   onStatusUpdate,
// }: Props) {
//   const [status, setStatus] = useState(application.status);
//   const [feedback, setFeedback] = useState(application.rejection_reason || '');

//   const handleSubmit = () => {
//     onStatusUpdate({
//       id: application.id,
//       status,
//       feedback: status === 'rejected' || status === 'needs_revision' ? feedback : undefined,
//     });
//   };

//   return (
//     <Dialog open={!!application} onOpenChange={onClose}>
//       <DialogContent className="max-w-2xl">
//         <DialogHeader>
//           <DialogTitle>Review Application</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Provider Type</Label>
//               <div className="flex items-center gap-2">
//                 <Badge variant="outline" className="capitalize">
//                   {application.provider_type}
//                 </Badge>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label>Current Status</Label>
//               <div className="flex items-center gap-2">
//                 {status === 'pending' && (
//                   <Badge variant="secondary">
//                     <Clock className="h-4 w-4 mr-1" />
//                     Pending
//                   </Badge>
//                 )}
//                 {status === 'approved' && (
//                   <Badge variant="success">
//                     <CheckCircle2 className="h-4 w-4 mr-1" />
//                     Approved
//                   </Badge>
//                 )}
//                 {status === 'rejected' && (
//                   <Badge variant="destructive">
//                     <XCircle className="h-4 w-4 mr-1" />
//                     Rejected
//                   </Badge>
//                 )}
//                 {status === 'needs_revision' && (
//                   <Badge variant="warning">
//                     <AlertCircle className="h-4 w-4 mr-1" />
//                     Needs Revision
//                   </Badge>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Organization</Label>
//               <div className="flex items-center gap-2 text-sm">
//                 <User className="h-4 w-4 text-gray-500" />
//                 {application.organization_name || 'N/A'}
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label>Contact Person</Label>
//               <div className="flex items-center gap-2 text-sm">
//                 <User className="h-4 w-4 text-gray-500" />
//                 {application.contact_person}
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Email</Label>
//               <div className="flex items-center gap-2 text-sm">
//                 <Mail className="h-4 w-4 text-gray-500" />
//                 {application.email}
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label>Phone</Label>
//               <div className="flex items-center gap-2 text-sm">
//                 <Phone className="h-4 w-4 text-gray-500" />
//                 {application.phone}
//               </div>
//             </div>
//           </div>

//           {application.address && (
//             <div className="space-y-2">
//               <Label>Address</Label>
//               <p className="text-sm">{application.address}</p>
//             </div>
//           )}

//           {application.license_number && (
//             <div className="space-y-2">
//               <Label>License Number</Label>
//               <p className="text-sm">{application.license_number}</p>
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Submitted</Label>
//               <p className="text-sm">
//                 {format(new Date(application.submitted_at), 'PPpp')}
//               </p>
//             </div>

//             {application.reviewed_at && (
//               <div className="space-y-2">
//                 <Label>Reviewed</Label>
//                 <p className="text-sm">
//                   {format(new Date(application.reviewed_at), 'PPpp')}
//                 </p>
//               </div>
//             )}
//           </div>

//           {application.license_document_url && (
//             <div className="space-y-2">
//               <Label>License Document</Label>
//               <div className="flex items-center gap-2">
//                 <FileText className="h-4 w-4 text-gray-500" />
//                 <a
//                   href={application.license_document_url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-sm text-blue-600 hover:underline"
//                 >
//                   View Document
//                 </a>
//               </div>
//             </div>
//           )}

//           <div className="space-y-4">
//             <div className="space-y-2">
//               <Label>Update Status</Label>
//               <Select value={status} onValueChange={setStatus}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="pending">Pending</SelectItem>
//                   <SelectItem value="approved">Approved</SelectItem>
//                   <SelectItem value="rejected">Rejected</SelectItem>
//                   <SelectItem value="needs_revision">Needs Revision</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {(status === 'rejected' || status === 'needs_revision') && (
//               <div className="space-y-2">
//                 <Label>Feedback</Label>
//                 <Textarea
//                   value={feedback}
//                   onChange={(e) => setFeedback(e.target.value)}
//                   placeholder="Provide feedback for the applicant..."
//                 />
//               </div>
//             )}
//           </div>

//           <div className="flex justify-end gap-2">
//             <Button variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button onClick={handleSubmit}>Update Application</Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }