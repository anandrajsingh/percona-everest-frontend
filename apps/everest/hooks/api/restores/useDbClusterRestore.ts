// percona-everest-frontend
// Copyright (C) 2023 Percona LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { useMutation, UseMutationOptions } from 'react-query';
import { createDbClusterRestore } from '../../../api/restores';
import { useSelectedKubernetesCluster } from '../kubernetesClusters/useSelectedKubernetesCluster';

export type RestoreFormData = {
  backupName: string;
};

export const useDbClusterRestore = (
  dbClusterName: string,
  options?: UseMutationOptions<any, unknown, RestoreFormData, unknown>
) => {
  const { id: clusterId } = useSelectedKubernetesCluster();
  return useMutation(
    (formData: RestoreFormData) =>
      createDbClusterRestore(clusterId, {
        apiVersion: 'everest.percona.com/v1alpha1',
        kind: 'DatabaseClusterRestore',
        metadata: {
          name: `restore-${formData.backupName}`,
        },
        spec: {
          dbClusterName,
          dataSource: {
            dbClusterBackupName: formData.backupName,
          },
        },
      }),
    { ...options }
  );
};
