
# MainSkillCreationPayload


## Properties

Name | Type
------------ | -------------
`id` | number
`isNew` | boolean
`linkedSkills` | [Array&lt;MainLinkedSkill&gt;](MainLinkedSkill.md)
`name` | string

## Example

```typescript
import type { MainSkillCreationPayload } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "isNew": null,
  "linkedSkills": null,
  "name": null,
} satisfies MainSkillCreationPayload

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MainSkillCreationPayload
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


