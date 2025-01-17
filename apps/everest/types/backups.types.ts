export type GetBackupPayload = {
  items: Array<{
    metadata: {
      name: string;
    };
    status: {
      created: string;
      completed: string;
      state: string;
    };
    spec: {
      dbClusterName: string;
      backupStorageName: string;
    };
  }>;
};

export type Backup = {
  name: string;
  created: Date | null;
  completed: Date | null;
  state: BackupStatus;
  dbClusterName: string;
  backupStorageName: string;
};

export enum BackupStatus {
  OK = 'OK',
  FAILED = 'Failed',
  IN_PROGRESS = 'In progress',
  UNKNOWN = 'Unknown',
}

export type BackupPayload = {
  apiVersion: 'everest.percona.com/v1alpha1';
  kind: 'DatabaseClusterBackup';
  metadata: {
    name: string;
  };
  spec: {
    dbClusterName: string;
    backupStorageName: string;
  };
};
