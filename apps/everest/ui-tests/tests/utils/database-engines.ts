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

import { APIRequestContext, expect } from '@playwright/test';

export const getEnginesList = async (
  request: APIRequestContext,
  kubernetesId: string
) => {
  const enginesList = await request.get(
    `/v1/kubernetes/${kubernetesId}/database-engines`
  );
  expect(enginesList.ok()).toBeTruthy();
  return (await enginesList.json()).items;
};
export const getEnginesVersions = async (
  request: APIRequestContext,
  kubernetesId: string
) => {
  const engineVersions = {
    pxc: [],
    psmdb: [],
    postgresql: [],
  };

  const engines = await getEnginesList(request, kubernetesId);
  engines.forEach((engine) => {
    const { type } = engine.spec;

    if (engine.status.status === 'installed') {
      engineVersions[type].push(
        ...Object.keys(engine.status.availableVersions.engine)
      );
    }
  });

  return engineVersions;
};
