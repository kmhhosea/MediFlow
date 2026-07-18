import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createPatient, updatePatient, getPatientsAction, getPatientByIdAction } from '@/lib/actions/patient.actions';

export function usePatients(query: string) {
  return useQuery({ queryKey: ['patients', query], queryFn: () => getPatientsAction(query) });
}

export function usePatient(id: string) {
  return useQuery({ queryKey: ['patients', id], queryFn: () => getPatientByIdAction(id), enabled: !!id });
}

export function useCreatePatient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createPatient,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['patients'] }),
  });
}

export function useUpdatePatient(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (values: unknown) => updatePatient(id, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['patients'] });
      qc.invalidateQueries({ queryKey: ['patients', id] });
    },
  });
}
