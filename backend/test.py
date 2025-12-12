
from datasets import load_dataset
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    TrainingArguments,
    Trainer
)
import os

print(tokenized_dataset["train"][0].keys())
# Should show: ['input_ids', 'attention_mask', 'labels']

# Test model output
test_input = tokenizer("Q: What are Prawin's frontend skills?\nA:", return_tensors="pt")
output = model.generate(**test_input)
print(tokenizer.decode(output[0]))