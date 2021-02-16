const BASE_URL = "http://pulp.int.staging.bounce.bike";

export const API = {
  NODE_TYPE: `${BASE_URL}/dashboard/node-types`,
  NODE_IDS: (nodeType: String) =>
      `${BASE_URL}/dashboard/node-ids?node-type=${nodeType}`,
  NAMESPACE: `${BASE_URL}/dashboard/namespaces`,
  GET_PROPERTIES: (nodeType: String, nodeId: String, nameSpace: String) =>
      `${BASE_URL}/internal/node/get/${nodeType}/${nodeId}/${nameSpace}`,
  MODIFY: `${BASE_URL}/dashboard/properties/modify`,
  NAMESPACE_ADD: `${BASE_URL}/dashboard/namespaces/add`
};
