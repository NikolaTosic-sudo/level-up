
# MainQuestsReponse


## Properties

Name | Type
------------ | -------------
`customQuests` | [Array&lt;MainCustomQuest&gt;](MainCustomQuest.md)
`repeatingQuests` | [Array&lt;MainTypeRepeatingQuest&gt;](MainTypeRepeatingQuest.md)

## Example

```typescript
import type { MainQuestsReponse } from ''

// TODO: Update the object below with actual values
const example = {
  "customQuests": null,
  "repeatingQuests": null,
} satisfies MainQuestsReponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MainQuestsReponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


