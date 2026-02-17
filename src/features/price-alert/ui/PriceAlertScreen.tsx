import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePriceAlertStore } from '@/src/entities/price-alert/model/priceAlertStore';
import { useFormModel } from '../model/formModel';
import { ConditionToggle } from './ConditionToggle';
import { ValidatedInput } from './ValidatedInput';
import { WarningBadge } from './WarningBadge';
import { SaveButton } from './SaveButton';
import { Button } from '@/src/shared/ui/Button';
import {
  DEFAULT_TOKEN,
  getCurrentPrice,
} from '@/src/shared/constants/mockData';
import { formatPrice, formatCurrencyOnBlur } from '@/src/shared/lib/format';

export const PriceAlertScreen: React.FC = () => {
  const [tokenSymbol] = useState(DEFAULT_TOKEN);
  const currentPrice = getCurrentPrice(tokenSymbol);

  // Store hooks
  const { alerts, addAlert, removeAlert } = usePriceAlertStore();
  const { condition, targetPrice, validation, setCondition, setTargetPrice, reset } =
    useFormModel();

  const [isSaving, setIsSaving] = useState(false);

  const handleBlur = () => {
    if (targetPrice) {
      const formatted = formatCurrencyOnBlur(targetPrice);
      if (formatted) {
        setTargetPrice(formatted, currentPrice);
      }
    }
  };

  const handleSave = async () => {
    if (!validation.isValid) return;

    try {
      setIsSaving(true);
      
      await addAlert({
        tokenSymbol,
        condition,
        targetPrice: parseFloat(targetPrice),
      });

      Alert.alert(
        'Success',
        'Price alert saved',
        [
          {
            text: 'OK',
            onPress: () => reset(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save alert');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Alert?',
      'This action cannot be undone',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => removeAlert(id),
        },
      ]
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
        <Text style={styles.title}>Price Alert</Text>
        <Text style={styles.subtitle}>Set up price alert</Text>
      </View>

      <View style={styles.currentPriceContainer}>
        <Text style={styles.currentPriceLabel}>Current {tokenSymbol} Price</Text>
        <Text style={styles.currentPriceValue}>{formatPrice(currentPrice)}</Text>
      </View>

      <View style={styles.form}>
        <ConditionToggle condition={condition} onChange={setCondition} />

        <ValidatedInput
          value={targetPrice}
          validation={validation}
          onChange={(value) => setTargetPrice(value, currentPrice)}
          onBlur={handleBlur}
        />

        {validation.warning && <WarningBadge message={validation.warning} />}

        <SaveButton
          disabled={!validation.isValid}
          onSave={handleSave}
          loading={isSaving}
        />
      </View>

      {alerts.length > 0 && (
        <View style={styles.alertsList}>
          <Text style={styles.alertsListTitle}>Saved Alerts</Text>
          {alerts.map((alert) => (
            <View key={alert.id} style={styles.alertItem}>
              <View style={styles.alertInfo}>
                <Text style={styles.alertToken}>{alert.tokenSymbol}</Text>
                <Text style={styles.alertCondition}>
                  {alert.condition === 'above' ? '▲ Above' : '▼ Below'}{' '}
                  {formatPrice(alert.targetPrice)}
                </Text>
                <Text style={styles.alertDate}>
                  {formatDate(alert.createdAt)}
                </Text>
              </View>
              <Button
                variant="danger"
                onPress={() => handleDelete(alert.id)}
                style={styles.deleteButton}>
                Delete
              </Button>
            </View>
          ))}
        </View>
      )}

      {alerts.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            No saved alerts
          </Text>
        </View>
      )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  currentPriceContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  currentPriceLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  currentPriceValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  form: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  alertsList: {
    marginBottom: 16,
  },
  alertsListTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  alertItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  alertInfo: {
    flex: 1,
  },
  alertToken: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  alertCondition: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
  },
  alertDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
  deleteButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 36,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
});
